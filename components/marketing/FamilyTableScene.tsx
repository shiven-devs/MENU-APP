"use client";

import { useEffect, useRef, useState } from "react";
import { Smartphone } from "lucide-react";

import { cn } from "@/lib/utils";

const guests = [
  { id: "you", label: "You", item: "Butter chicken" },
  { id: "partner", label: "Partner", item: "Garlic naan ×2" },
  { id: "kid", label: "Kid", item: "Mango lassi" },
  { id: "elder", label: "Grandparent", item: "Dal tadka" },
] as const;

/**
 * Plays only when scrolled into view. Each guest "picks up a phone" on a
 * timer so the order count climbs with table size — the marketing point
 * without needing a chart library.
 */
export function FamilyTableScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [seated, setSeated] = useState(1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setSeated(guests.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;

    const id = window.setInterval(() => {
      setSeated((n) => {
        if (n >= guests.length) {
          window.clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 850);

    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10"
    >
      <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-8">
        <div>
          <p className="text-sm font-medium text-primary">One table, many menus</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
            A family does not share one paper menu anymore.
          </h2>
          <p className="mt-3 text-muted-foreground">
            With a printed menu, one person holds it while everyone else waits.
            With a QR code, each guest opens the same menu on their phone —
            so more people decide at the same time, and more items make it onto
            the order.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3" aria-live="polite">
            <div className="rounded-xl bg-muted/70 px-4 py-3">
              <dt className="text-xs text-muted-foreground">Menus in hand</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums">
                {seated}
              </dd>
            </div>
            <div className="rounded-xl bg-muted/70 px-4 py-3">
              <dt className="text-xs text-muted-foreground">Items chosen</dt>
              <dd className="mt-1 text-3xl font-semibold tabular-nums text-primary">
                {seated}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Table of four
          </p>
          <ul className="grid grid-cols-2 gap-3">
            {guests.map((guest, index) => {
              const active = index < seated;
              return (
                <li
                  key={guest.id}
                  className={cn(
                    "rounded-xl border bg-background p-3 transition-all duration-500 motion-reduce:transition-none",
                    active
                      ? "translate-y-0 scale-100 border-primary/30 opacity-100 shadow-sm motion-safe:animate-pop"
                      : "translate-y-2 scale-95 opacity-40",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full",
                        active
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Smartphone className="size-4" />
                    </span>
                    <span className="text-sm font-medium">{guest.label}</span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {active ? guest.item : "Waiting for the menu…"}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
