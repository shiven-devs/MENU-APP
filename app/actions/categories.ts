"use server";

import { revalidatePath } from "next/cache";

import { Category } from "@/lib/models/Category";
import { MenuItem } from "@/lib/models/MenuItem";
import { requireOwnerRestaurant } from "@/lib/owner";
import type { ActionState } from "@/lib/types";
import { categorySchema } from "@/lib/validations";

export async function createCategoryAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid category" };
  }

  const { restaurant } = await requireOwnerRestaurant();
  const last = await Category.findOne({ restaurantId: restaurant._id })
    .sort({ displayOrder: -1 })
    .select("displayOrder");

  await Category.create({
    restaurantId: restaurant._id,
    name: parsed.data.name,
    displayOrder: (last?.displayOrder ?? -1) + 1,
  });

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: "Category added." };
}

export async function renameCategoryAction(
  categoryId: string,
  name: string,
): Promise<ActionState> {
  const parsed = categorySchema.safeParse({ name });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid name" };
  }

  const { restaurant } = await requireOwnerRestaurant();
  await Category.updateOne(
    { _id: categoryId, restaurantId: restaurant._id },
    { name: parsed.data.name },
  );

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: "Category renamed." };
}

export async function deleteCategoryAction(
  categoryId: string,
): Promise<ActionState> {
  const { restaurant } = await requireOwnerRestaurant();
  await MenuItem.deleteMany({
    categoryId,
    restaurantId: restaurant._id,
  });
  await Category.deleteOne({ _id: categoryId, restaurantId: restaurant._id });

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: "Category deleted." };
}

export async function moveCategoryAction(
  categoryId: string,
  direction: "up" | "down",
): Promise<ActionState> {
  const { restaurant } = await requireOwnerRestaurant();
  const categories = await Category.find({ restaurantId: restaurant._id }).sort({
    displayOrder: 1,
  });
  const index = categories.findIndex((c) => c._id.toString() === categoryId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= categories.length) {
    return {};
  }

  const currentOrder = categories[index].displayOrder;
  categories[index].displayOrder = categories[swapWith].displayOrder;
  categories[swapWith].displayOrder = currentOrder;
  await categories[index].save();
  await categories[swapWith].save();

  revalidatePath("/dashboard/menu");
  revalidatePath(`/r/${restaurant.slug}`);
  return {};
}
