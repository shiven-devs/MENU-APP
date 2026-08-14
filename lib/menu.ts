import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { MenuItem } from "@/lib/models/MenuItem";
import { Restaurant } from "@/lib/models/Restaurant";
import type {
  CategoryPublic,
  MenuItemPublic,
  RestaurantPublic,
} from "@/lib/types";

export type PublicMenu = {
  restaurant: RestaurantPublic;
  categories: CategoryPublic[];
  items: MenuItemPublic[];
};

export async function getPublicMenu(slug: string): Promise<PublicMenu | null> {
  await connectDB();
  const restaurant = await Restaurant.findOne({ slug }).lean();
  if (!restaurant) {
    return null;
  }

  const [categories, items] = await Promise.all([
    Category.find({ restaurantId: restaurant._id }).sort({ displayOrder: 1 }).lean(),
    MenuItem.find({ restaurantId: restaurant._id }).sort({ displayOrder: 1 }).lean(),
  ]);

  return {
    restaurant: {
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
    },
    categories: categories.map((category) => ({
      id: category._id.toString(),
      name: category.name,
      displayOrder: category.displayOrder,
    })),
    items: items.map((item) => ({
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
    })),
  };
}
