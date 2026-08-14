"use client";

import { Button } from "@/components/ui/button";

export default function PublicMenuError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-xl font-semibold">Could not load this menu</h1>
      <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
