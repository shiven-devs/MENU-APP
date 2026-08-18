import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  /** Homepage header: load the mark immediately. */
  priority?: boolean;
};

/**
 * Shared product lockup: Q-cloche mark + “Qrato” word.
 * No `"use client"` — Image and Link work in Server Components; this file
 * can also be imported from client components because it has no server-only APIs.
 */
export function BrandLogo({
  href = "/",
  className,
  size = "md",
  priority = false,
}: BrandLogoProps) {
  const compact = size === "sm";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-foreground no-underline",
        className,
      )}
    >
      <Image
        src="/qrato-mark.png"
        alt=""
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        className={cn(
          "rounded-md object-contain",
          compact ? "size-8" : "size-9 sm:size-10",
        )}
        priority={priority}
      />
      <span
        className={cn(
          "font-semibold tracking-tight",
          compact ? "text-base" : "text-lg",
        )}
      >
        Qrato
      </span>
    </Link>
  );
}
