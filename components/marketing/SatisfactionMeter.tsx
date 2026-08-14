import { Smile } from "lucide-react";

import { Reveal } from "@/components/marketing/Reveal";

const faces = ["Waiting", "Browsing", "Deciding", "Happy", "Ordering"] as const;

/**
 * Width animation is CSS (animate-fill-bar). Reveal only decides *when*
 * the bar is in the DOM-visible tree so the keyframe starts on scroll.
 */
export function SatisfactionMeter() {
  return (
    <Reveal>
      <div className="rounded-2xl bg-card p-6 ring-1 ring-foreground/10 sm:p-8">
        <p className="text-sm font-medium text-primary">Guest satisfaction</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
          Photos and prices cut the guesswork.
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          When everyone can see the dish, they order with more confidence —
          and they stop passing one paper menu around the table.
        </p>

        <ol className="mt-8 flex justify-between gap-2">
          {faces.map((label, i) => (
            <li
              key={label}
              className="flex flex-1 flex-col items-center gap-2 motion-reduce:animate-none group-data-[visible=true]/reveal:motion-safe:animate-pop"
              style={{ animationDelay: `${i * 140}ms` }}
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/12 text-primary sm:size-12">
                <Smile className="size-5 sm:size-6" />
              </span>
              <span className="hidden text-center text-[11px] text-muted-foreground sm:block">
                {label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Confidence at the table</span>
            <span>High</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[8%] rounded-full bg-primary motion-reduce:w-[92%] group-data-[visible=true]/reveal:motion-safe:animate-fill-bar" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
