import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { requireOwnerRestaurant } from "@/lib/owner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { restaurant } = await requireOwnerRestaurant();

  return (
    <div className="flex min-h-full flex-1 flex-col md:flex-row">
      <DashboardNav restaurantName={restaurant.name} />
      <div className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
    </div>
  );
}
