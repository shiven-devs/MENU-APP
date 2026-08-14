import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MenuItemPublic } from "@/lib/types";

export function ItemCard({
  item,
  currency,
}: {
  item: MenuItemPublic;
  currency: string;
}) {
  return (
    <article
      className={cn(
        "flex gap-3 rounded-xl bg-card p-3 ring-1 ring-foreground/10",
        !item.isAvailable && "opacity-50",
      )}
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <span
            className={cn(
              "mt-1 size-2.5 shrink-0 rounded-sm ring-1 ring-foreground/20",
              item.isVeg ? "bg-green-600" : "bg-[oklch(0.45_0.12_40)]",
            )}
            title={item.isVeg ? "Vegetarian" : "Non-vegetarian"}
            aria-label={item.isVeg ? "Vegetarian" : "Non-vegetarian"}
          />
          <h3 className="font-medium text-balance">{item.name}</h3>
        </div>
        {item.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold">
            {currency}
            {item.price.toFixed(0)}
          </p>
          {item.isSpecial ? <Badge>Today&apos;s Special</Badge> : null}
          {!item.isAvailable ? (
            <span className="text-xs text-muted-foreground">Currently unavailable</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
