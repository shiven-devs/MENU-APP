import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { ItemCard } from "@/components/menu/ItemCard";
import { RestaurantHeader } from "@/components/menu/RestaurantHeader";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { getPublicMenu } from "@/lib/menu";

type PublicMenuPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ table?: string }>;
};

export async function generateMetadata({
  params,
}: PublicMenuPageProps): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getPublicMenu(slug);
  if (!menu) {
    return { title: "Menu not found" };
  }
  return {
    title: menu.restaurant.name,
    description: menu.restaurant.description || `Menu for ${menu.restaurant.name}`,
  };
}

export default async function PublicMenuPage({
  params,
  searchParams,
}: PublicMenuPageProps) {
  const { slug } = await params;
  const menu = await getPublicMenu(slug);
  if (!menu) {
    notFound();
  }

  // `table` is accepted so a future cart can know which table scanned.
  // This version is view-only, so we do not show or use it.
  await searchParams;

  const { restaurant, categories, items } = menu;

  return (
    <div className="min-h-full flex-1 bg-[oklch(0.98_0.01_80)] pb-16">
      <RestaurantHeader restaurant={restaurant} />
      <CategoryTabs categories={categories} />

      <main className="mx-auto max-w-3xl px-4">
        {categories.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Menu coming soon.
          </p>
        ) : (
          categories.map((category) => {
            const categoryItems = items.filter(
              (item) => item.categoryId === category.id,
            );
            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className="scroll-mt-16 py-6"
              >
                <h2 className="mb-3 text-lg font-semibold">{category.name}</h2>
                {categoryItems.length === 0 ? (
                  <p className="rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                    No items in this category yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {categoryItems.map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        currency={restaurant.currency}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })
        )}
      </main>
      <footer className="mx-auto mt-10 flex max-w-3xl justify-center px-4">
        <BrandLogo href="/" size="sm" />
      </footer>
    </div>
  );
}
