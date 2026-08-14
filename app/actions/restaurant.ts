"use server";

import { revalidatePath } from "next/cache";

import { requireOwnerRestaurant } from "@/lib/owner";
import { uniqueSlug } from "@/lib/slug";
import type { ActionState } from "@/lib/types";
import { settingsSchema } from "@/lib/validations";

export async function updateSettingsAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = settingsSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") ?? "",
    address: formData.get("address") ?? "",
    contactNumber: formData.get("contactNumber") ?? "",
    currency: formData.get("currency") || "₹",
    logoUrl: formData.get("logoUrl") ?? "",
    coverImageUrl: formData.get("coverImageUrl") ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid settings" };
  }

  const { restaurant } = await requireOwnerRestaurant();

  const previousSlug = restaurant.slug;
  const slug = await uniqueSlug(parsed.data.slug, restaurant._id.toString());

  restaurant.name = parsed.data.name;
  restaurant.slug = slug;
  restaurant.description = parsed.data.description;
  restaurant.address = parsed.data.address;
  restaurant.contactNumber = parsed.data.contactNumber;
  restaurant.currency = parsed.data.currency;
  restaurant.logoUrl = parsed.data.logoUrl;
  restaurant.coverImageUrl = parsed.data.coverImageUrl;
  await restaurant.save();

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  revalidatePath(`/r/${previousSlug}`);
  revalidatePath(`/r/${slug}`);

  return { success: "Settings saved." };
}

export async function toggleOpenAction(isOpen: boolean): Promise<ActionState> {
  const { restaurant } = await requireOwnerRestaurant();
  restaurant.isOpen = isOpen;
  await restaurant.save();
  revalidatePath("/dashboard");
  revalidatePath(`/r/${restaurant.slug}`);
  return { success: restaurant.isOpen ? "Marked as open." : "Marked as closed." };
}
