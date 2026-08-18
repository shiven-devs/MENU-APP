import Link from "next/link";
import {
  Camera,
  QrCode,
  Smile,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { FamilyTableScene } from "@/components/marketing/FamilyTableScene";
import { HeroVisual } from "@/components/marketing/HeroVisual";
import { Reveal } from "@/components/marketing/Reveal";
import { SatisfactionMeter } from "@/components/marketing/SatisfactionMeter";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: QrCode,
    title: "Scan at the table",
    body: "One QR code per restaurant. Stick the same printout on every table — guests land on your menu instantly.",
  },
  {
    icon: Camera,
    title: "See food, not guesswork",
    body: "Photos and prices sit next to each dish. Fewer “what’s in this?” questions, fewer disappointed plates.",
  },
  {
    icon: UtensilsCrossed,
    title: "Order with your staff",
    body: "Guests browse on their phones, then tell the waiter. No app download, no in-app cart in this version.",
  },
];

const perks = [
  {
    icon: Smile,
    title: "Guests feel looked after",
    body: "Everyone can browse at their own pace — including kids, elders, and people who prefer large photos over a tiny printed card.",
  },
  {
    icon: Sparkles,
    title: "The menu stays current",
    body: "Change a price or hide a dish from the dashboard. Tables see the update on the next scan — no reprinting a stack of paper.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[oklch(0.98_0.01_80)]">
      <header className="sticky top-0 z-20 border-b border-foreground/5 bg-[oklch(0.98_0.01_80)/90] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3 sm:px-6 sm:py-4">
          <BrandLogo href="/" priority />
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-5xl items-center gap-10 px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-medium text-primary motion-safe:animate-hero-in motion-reduce:animate-none">
              QR digital menus
            </p>
            <h1
              className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-balance motion-safe:animate-hero-in motion-reduce:animate-none sm:text-5xl"
              style={{ animationDelay: "90ms" }}
            >
              Your menu on every table. No app download. No cart.
            </h1>
            <p
              className="mt-4 max-w-lg text-lg text-muted-foreground motion-safe:animate-hero-in motion-reduce:animate-none"
              style={{ animationDelay: "180ms" }}
            >
              Guests scan a QR code, browse prices and photos, then order with
              your staff. You manage the menu from a dashboard.
            </p>
            <div
              className="mt-8 flex flex-col gap-3 motion-safe:animate-hero-in motion-reduce:animate-none sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "270ms" }}
            >
              <Button size="lg" className="h-11 px-4" asChild>
                <Link href="/signup">Create your restaurant</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-4" asChild>
                <Link href="/login">Owner login</Link>
              </Button>
            </div>
          </div>
          <div
            className="motion-safe:animate-hero-in motion-reduce:animate-none"
            style={{ animationDelay: "200ms" }}
          >
            <HeroVisual />
          </div>
        </section>

        <section className="border-t border-foreground/5 bg-background/40">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-16 sm:px-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delayMs={i * 90}>
                <div className="h-full">
                  <span
                    className={
                      i === 0
                        ? "flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary group-data-[visible=true]/reveal:motion-safe:animate-pulse-soft"
                        : "flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary"
                    }
                  >
                    <step.icon className="size-5" />
                  </span>
                  <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Step {i + 1}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6">
          <FamilyTableScene />
        </section>

        <section className="border-t border-foreground/5 bg-background/40">
          <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6">
            <SatisfactionMeter />
          </div>
        </section>

        <section className="border-t border-foreground/5">
          <div className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-16 sm:px-6 md:grid-cols-2">
            {perks.map((perk) => (
              <Reveal key={perk.title}>
                <article className="h-full rounded-2xl bg-card p-6 ring-1 ring-foreground/10">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <perk.icon className="size-5" />
                  </span>
                  <h2 className="mt-4 text-xl font-semibold">{perk.title}</h2>
                  <p className="mt-2 text-muted-foreground">{perk.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-t border-foreground/5 bg-background/40">
          <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6">
            <Reveal>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight text-balance">
                    Put a QR on the table tonight.
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Create the restaurant, add dishes with photos, download one
                    code, print it for every table.
                  </p>
                </div>
                <Button size="lg" className="h-11 px-4" asChild>
                  <Link href="/signup">Get started free</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-foreground/5">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-6">
          <BrandLogo href="/" size="sm" />
          <p className="text-xs text-muted-foreground">
            Digital menus for modern restaurants
          </p>
        </div>
      </footer>
    </div>
  );
}
