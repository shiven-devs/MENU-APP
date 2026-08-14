/** Smallest real QR size (Version 1). Dense enough to read as a code, not seats. */
const QR_SIZE = 21;

/**
 * Builds a static 21×21 module map: three finder patterns, timing strips,
 * then a deterministic "data" fill. Deterministic on purpose — this is a
 * Server Component, so Math.random() would mismatch across renders.
 */
function qrModules(): boolean[][] {
  const grid = Array.from({ length: QR_SIZE }, () =>
    Array.from({ length: QR_SIZE }, () => false),
  );

  const paintFinder = (originRow: number, originCol: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const onRing = r === 0 || r === 6 || c === 0 || c === 6;
        const inCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[originRow + r][originCol + c] = onRing || inCore;
      }
    }
  };

  paintFinder(0, 0);
  paintFinder(0, QR_SIZE - 7);
  paintFinder(QR_SIZE - 7, 0);

  const reserved = (r: number, c: number) => {
    if (r < 8 && c < 8) return true;
    if (r < 8 && c >= QR_SIZE - 8) return true;
    if (r >= QR_SIZE - 8 && c < 8) return true;
    if (r === 6 || c === 6) return true;
    return false;
  };

  for (let i = 8; i < QR_SIZE - 8; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  for (let r = 0; r < QR_SIZE; r++) {
    for (let c = 0; c < QR_SIZE; c++) {
      if (reserved(r, c)) continue;
      grid[r][c] = (r * 7 + c * 13 + r * c) % 5 !== 1;
    }
  }

  return grid;
}

const modules = qrModules();

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
        <div
          className="grid size-full gap-px p-3"
          style={{
            gridTemplateColumns: `repeat(${QR_SIZE}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${QR_SIZE}, minmax(0, 1fr))`,
          }}
        >
          {modules.flatMap((row, r) =>
            row.map((dark, c) => (
              <span
                key={`${r}-${c}`}
                className={dark ? "bg-foreground" : "bg-transparent"}
              />
            )),
          )}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-[14%] h-0.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] motion-safe:animate-scan motion-reduce:hidden"
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
