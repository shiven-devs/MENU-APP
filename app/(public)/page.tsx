import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[oklch(0.98_0.01_80)]">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <p className="text-lg font-semibold tracking-tight">Plate</p>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get started</Link>
          </Button>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-20">
        <p className="text-sm font-medium text-primary">QR digital menus</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Your menu on every table. No app download. No cart.
        </h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          Guests scan a QR code, browse prices and photos, then order with your
          staff. You manage the menu from a dashboard.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/signup">Create your restaurant</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Owner login</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
