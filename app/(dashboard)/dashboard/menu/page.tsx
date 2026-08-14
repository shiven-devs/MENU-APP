import type { Metadata } from "next";

import { MenuManager } from "@/components/dashboard/MenuManager";
import { Category } from "@/lib/models/Category";
import { MenuItem } from "@/lib/models/MenuItem";
import { requireOwnerRestaurant } from "@/lib/owner";

export const metadata: Metadata = {
  title: "Menu",
};

export default async function DashboardMenuPage() {
  const { restaurant } = await requireOwnerRestaurant();

  const [categories, items] = await Promise.all([
    Category.find({ restaurantId: restaurant._id }).sort({ displayOrder: 1 }),
    MenuItem.find({ restaurantId: restaurant._id }).sort({ displayOrder: 1 }),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Menu</h1>
        <p className="text-muted-foreground">
          Categories and items. Guests see this on the public QR page.
        </p>
      </div>
      <MenuManager
        currency={restaurant.currency}
        categories={categories.map((category) => ({
          id: category._id.toString(),
          name: category.name,
          displayOrder: category.displayOrder,
        }))}
        items={items.map((item) => ({
          id: item._id.toString(),
          categoryId: item.categoryId.toString(),
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          isVeg: item.isVeg,
          isAvailable: item.isAvailable,
          isSpecial: item.isSpecial,
          displayOrder: item.displayOrder,
        }))}
      />
    </div>
  );
}
