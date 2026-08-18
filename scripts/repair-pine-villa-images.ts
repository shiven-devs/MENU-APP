import mongoose from "mongoose";

import { connectDB } from "../lib/db";
import { MenuItem } from "../lib/models/MenuItem";
import { Restaurant } from "../lib/models/Restaurant";
import {
  assignFoodPhoto,
  isAllowedMenuImageHost,
  unsplashPhoto,
} from "./food-photos";

/**
 * Fixes broken dish photos in place (does not delete dishes the owner renamed).
 * next/image only loads Cloudinary + Unsplash; Pexels and 404 Unsplash IDs fail.
 */
async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "GET", redirect: "follow" });
    await response.arrayBuffer();
    return response.status < 400;
  } catch {
    return false;
  }
}

async function repair() {
  const force = process.argv.includes("--reassign");
  await connectDB();

  const restaurant = await Restaurant.findOne({ slug: "pine-villa" });
  if (!restaurant) {
    throw new Error("No restaurant with slug pine-villa.");
  }

  const items = await MenuItem.find({ restaurantId: restaurant._id });
  const used = new Set<string>();
  let updated = 0;

  for (const item of items) {
    const current = item.imageUrl ?? "";
    const hostOk = isAllowedMenuImageHost(current);
    const alive = !force && hostOk && (await imageExists(current));
    if (alive) {
      const id = current.match(/photo-([^?]+)/)?.[1];
      if (id) used.add(id);
      continue;
    }

    item.imageUrl = assignFoodPhoto(item.name, used);
    await item.save();
    updated += 1;
    console.log(`updated ${item.name} -> ${item.imageUrl}`);
  }

  if (restaurant.coverImageUrl && !(await imageExists(restaurant.coverImageUrl))) {
    restaurant.coverImageUrl = unsplashPhoto("1517248135467-4c7edcad34c4");
    await restaurant.save();
  }

  console.log(`Repaired ${updated} of ${items.length} Pine Villa dishes.`);
  await mongoose.disconnect();
}

repair().catch((error) => {
  console.error(error);
  process.exit(1);
});
