import Image from "next/image";

import type { RestaurantPublic } from "@/lib/types";

export function RestaurantHeader({
  restaurant,
}: {
  restaurant: RestaurantPublic;
}) {
  return (
    <header className="overflow-hidden bg-card">
      <div className="relative h-44 w-full bg-[oklch(0.92_0.03_70)] sm:h-56">
        {restaurant.coverImageUrl ? (
          <Image
            src={restaurant.coverImageUrl}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : null}
        {!restaurant.isOpen ? (
          <p className="absolute inset-x-0 bottom-0 bg-foreground/80 px-4 py-2 text-center text-sm text-background">
            Restaurant is currently closed
          </p>
        ) : null}
      </div>
      <div className="mx-auto flex max-w-3xl items-start gap-4 px-4 py-4">
        {restaurant.logoUrl ? (
          <Image
            src={restaurant.logoUrl}
            alt=""
            width={64}
            height={64}
            className="size-16 rounded-xl object-cover ring-1 ring-foreground/10"
          />
        ) : (
          <div className="size-16 rounded-xl bg-muted" />
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">{restaurant.name}</h1>
          {restaurant.description ? (
            <p className="mt-1 text-sm text-muted-foreground">{restaurant.description}</p>
          ) : null}
          <p className="mt-2 text-xs text-muted-foreground">
            {[restaurant.address, restaurant.contactNumber].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </header>
  );
}
