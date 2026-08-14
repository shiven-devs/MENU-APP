"use server";

import { revalidatePath } from "next/cache";

import { Category } from "@/lib/models/Category";
import { MenuItem } from "@/lib/models/MenuItem";
import { requireOwnerRestaurant } from "@/lib/owner";
import type { ActionState } from "@/lib/types";
import { menuItemSchema } from "@/lib/validations";

function formBool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export async function createItemAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = menuItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") ?? "",
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    isVeg: formBool(formData, "isVeg"),
    isAvailable: formBool(formData, "isAvailable"),
    isSpecial: formBool(formData, "isSpecial"),
    imageUrl: formData.get("imageUrl") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid item" };
  }

  const { restaurant } = await requireOwnerRestaurant();
  const category = await Category.findOne({
    _id: parsed.data.categoryId,
    restaurantId: restaurant._id,
  });
  if (!category) {
    return { error: "Category not found." };
  }

  const last = await MenuItem.findOne({
    restaurantId: restaurant._id,
    categoryId: category._id,
  })
    .sort({ displayOrder: -1 })
    .select("displayOrder");

  await MenuItem.create({
    restaurantId: restaurant._id,
    categoryId: category._id,
    name: parsed.data.name,
    description: parsed.data.description,
    price: parsed.data.price,
    imageUrl: parsed.data.imageUrl,
    isVeg: parsed.data.isVeg,
    isAvailable: parsed.data.isAvailable,
    isSpecial: parsed.data.isSpecial,
    displayOrder: (last?.displayOrder ?? -1) + 1,
  });

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: "Item added." };
}

export async function updateItemAction(
  itemId: string,
  formData: FormData,
): Promise<ActionState> {
  const parsed = menuItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description") ?? "",
    price: formData.get("price"),
    categoryId: formData.get("categoryId"),
    isVeg: formBool(formData, "isVeg"),
    isAvailable: formBool(formData, "isAvailable"),
    isSpecial: formBool(formData, "isSpecial"),
    imageUrl: formData.get("imageUrl") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid item" };
  }

  const { restaurant } = await requireOwnerRestaurant();
  await MenuItem.updateOne(
    { _id: itemId, restaurantId: restaurant._id },
    {
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      categoryId: parsed.data.categoryId,
      isVeg: parsed.data.isVeg,
      isAvailable: parsed.data.isAvailable,
      isSpecial: parsed.data.isSpecial,
      imageUrl: parsed.data.imageUrl,
    },
  );

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: "Item updated." };
}

export async function deleteItemAction(itemId: string): Promise<ActionState> {
  const { restaurant } = await requireOwnerRestaurant();
  await MenuItem.deleteOne({ _id: itemId, restaurantId: restaurant._id });
  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: "Item deleted." };
}

export async function toggleItemFlagAction(
  itemId: string,
  field: "isAvailable" | "isSpecial",
  value: boolean,
): Promise<ActionState> {
  const { restaurant } = await requireOwnerRestaurant();
  await MenuItem.updateOne(
    { _id: itemId, restaurantId: restaurant._id },
    { [field]: value },
  );
  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return {};
}

export async function moveItemAction(
  itemId: string,
  direction: "up" | "down",
): Promise<ActionState> {
  const { restaurant } = await requireOwnerRestaurant();
  const item = await MenuItem.findOne({
    _id: itemId,
    restaurantId: restaurant._id,
  });
  if (!item) {
    return { error: "Item not found." };
  }

  const siblings = await MenuItem.find({
    restaurantId: restaurant._id,
    categoryId: item.categoryId,
  }).sort({ displayOrder: 1 });

  const index = siblings.findIndex((s) => s._id.toString() === itemId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= siblings.length) {
    return {};
  }

  const currentOrder = siblings[index].displayOrder;
  siblings[index].displayOrder = siblings[swapWith].displayOrder;
  siblings[swapWith].displayOrder = currentOrder;
  await siblings[index].save();
  await siblings[swapWith].save();

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return {};
}
