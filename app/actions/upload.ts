"use server";

import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { requireOwnerRestaurant } from "@/lib/owner";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  await requireOwnerRestaurant();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose an image to upload." };
  }

  try {
    const url = await uploadImageToCloudinary(file, "menu-platform");
    return { url };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed. Check Cloudinary credentials.";
    return { error: message };
  }
}
