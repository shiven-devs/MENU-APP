import { redirect } from "next/navigation";
import type { HydratedDocument } from "mongoose";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Restaurant, type RestaurantDoc } from "@/lib/models/Restaurant";

export async function requireOwnerRestaurant(): Promise<{
  userId: string;
  restaurant: HydratedDocument<RestaurantDoc>;
}> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();
  const restaurant = await Restaurant.findOne({ ownerId: session.user.id });
  if (!restaurant) {
    redirect("/session-stale");
  }

  return { userId: session.user.id, restaurant };
}

export function publicAppUrl(): string {
  return (
    process.env.APP_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export function tableMenuPath(slug: string, label: string): string {
  return `/r/${slug}?table=${encodeURIComponent(label)}`;
}
