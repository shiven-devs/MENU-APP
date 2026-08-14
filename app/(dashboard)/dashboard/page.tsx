import type { Metadata } from "next";
import Link from "next/link";

import { OpenToggle } from "@/components/dashboard/OpenToggle";
import { RestaurantQr } from "@/components/dashboard/RestaurantQr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MenuItem } from "@/lib/models/MenuItem";
import { requireOwnerRestaurant } from "@/lib/owner";
import { qrDataUrlForRestaurant, restaurantMenuAbsoluteUrl } from "@/lib/qr";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardOverviewPage() {
  const { restaurant } = await requireOwnerRestaurant();
  const itemCount = await MenuItem.countDocuments({
    restaurantId: restaurant._id,
  });
  const menuUrl = restaurantMenuAbsoluteUrl(restaurant.slug);
  const qrDataUrl = await qrDataUrlForRestaurant(restaurant.slug);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{restaurant.name}</h1>
        <p className="text-muted-foreground">
          Public menu:{" "}
          <Link
            href={`/r/${restaurant.slug}`}
            className="text-primary underline-offset-4 hover:underline"
          >
            /r/{restaurant.slug}
          </Link>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Restaurant QR</CardTitle>
          <CardDescription>
            One code. Stick a copy on each table — they all open the same menu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RestaurantQr
            restaurantName={restaurant.name}
            menuUrl={menuUrl}
            qrDataUrl={qrDataUrl}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dining room</CardTitle>
          <CardDescription>
            Closed restaurants still show the menu — guests just see a banner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OpenToggle isOpen={restaurant.isOpen} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu items</CardTitle>
          <CardDescription>{itemCount} on the menu</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/menu">Manage menu</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
