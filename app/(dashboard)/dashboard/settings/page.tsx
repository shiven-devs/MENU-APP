import type { Metadata } from "next";

import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { requireOwnerRestaurant } from "@/lib/owner";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function DashboardSettingsPage() {
  const { restaurant } = await requireOwnerRestaurant();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          These fields show on the public menu. Open/closed is on the overview.
        </p>
      </div>
      <SettingsForm
        restaurant={{
          id: restaurant._id.toString(),
          name: restaurant.name,
          slug: restaurant.slug,
          logoUrl: restaurant.logoUrl,
          coverImageUrl: restaurant.coverImageUrl,
          description: restaurant.description,
          address: restaurant.address,
          contactNumber: restaurant.contactNumber,
          currency: restaurant.currency,
          isOpen: restaurant.isOpen,
        }}
      />
    </div>
  );
}
