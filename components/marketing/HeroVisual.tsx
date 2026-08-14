/**
 * Pure CSS motion — no "use client". Keyframes live in globals.css and
 * Tailwind maps them to animate-* utilities. Reduced-motion users get a
 * still frame via motion-reduce:animate-none.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <MiniPhone
        className="absolute top-2 left-0 w-[38%] motion-safe:animate-float"
        dish="Butter chicken"
        delay="0s"
      />
      <MiniPhone
        className="absolute top-8 right-0 w-[38%] motion-safe:animate-float-delayed"
        dish="Garlic naan"
        delay="0.15s"
      />
      <MiniPhone
        className="absolute bottom-4 left-[18%] w-[38%] motion-safe:animate-float"
        dish="Mango lassi"
        delay="0.3s"
      />

      <div className="absolute inset-[22%] overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-foreground/10">
        <div className="grid size-full grid-cols-5 grid-rows-5 gap-1 p-5">
          {Array.from({ length: 25 }, (_, i) => (
            <span
              key={i}
              className={
                [0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 19, 20, 22, 23, 24].includes(
                  i,
                )
                  ? "rounded-sm bg-foreground"
                  : "rounded-sm bg-foreground/15"
              }
            />
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 top-[14%] h-0.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] motion-safe:animate-scan motion-reduce:hidden"
        />
      </div>
    </div>
  );
}

function MiniPhone({
  className,
  dish,
  delay,
}: {
  className?: string;
  dish: string;
  delay: string;
}) {
  return (
    <div
      className={className}
      style={{ animationDelay: delay }}
    >
      <div className="rounded-2xl bg-card px-2.5 py-2 shadow-md ring-1 ring-foreground/10">
        <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-muted" />
        <p className="text-[10px] font-medium leading-tight">{dish}</p>
        <p className="text-[10px] text-primary">₹280</p>
      </div>
    </div>
  );
}
