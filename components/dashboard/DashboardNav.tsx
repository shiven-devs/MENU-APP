"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, LogOut, Settings, UtensilsCrossed } from "lucide-react";

import { logoutAction } from "@/app/actions/auth";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function SignOutForm({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <form action={logoutAction} className={className}>
      {children}
    </form>
  );
}

export function DashboardNav({ restaurantName }: { restaurantName: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col gap-4 border-b bg-sidebar px-4 py-4 md:h-svh md:w-60 md:gap-6 md:sticky md:top-0 md:border-b-0 md:border-r md:py-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <BrandLogo href="/dashboard" size="sm" />
          <p className="mt-1 font-semibold">{restaurantName}</p>
        </div>
        {/* Mobile: account action lives top-right, not a full-width block under the tabs. */}
        <SignOutForm className="md:hidden">
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut />
          </Button>
        </SignOutForm>
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
      {/* Desktop: mt-auto only works when the sidebar is as tall as the viewport. */}
      <SignOutForm className="mt-auto hidden md:block">
        <Button type="submit" variant="outline" className="w-full">
          Sign out
        </Button>
      </SignOutForm>
    </aside>
  );
}
