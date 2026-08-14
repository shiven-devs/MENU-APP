"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Settings, UtensilsCrossed } from "lucide-react";

import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav({ restaurantName }: { restaurantName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col gap-6 border-b bg-sidebar px-4 py-4 md:w-60 md:border-b-0 md:border-r md:py-8">
      <div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Plate
        </p>
        <p className="mt-1 font-semibold">{restaurantName}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto md:flex-col">
        {links.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap",
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <form action={logoutAction} className="mt-auto">
        <Button type="submit" variant="outline" className="w-full">
          Sign out
        </Button>
      </form>
    </aside>
  );
}
