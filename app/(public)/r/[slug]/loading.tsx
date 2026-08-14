import { Skeleton } from "@/components/ui/skeleton";

export default function PublicMenuLoading() {
  return (
    <div className="min-h-full flex-1 bg-[oklch(0.98_0.01_80)]">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  );
}
