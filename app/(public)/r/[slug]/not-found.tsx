import Link from "next/link";

export default function PublicMenuNotFound() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold">Menu not found</h1>
      <p className="text-muted-foreground">
        That restaurant link is invalid or the page was moved.
      </p>
      <Link href="/" className="text-primary underline-offset-4 hover:underline">
        Back to Qrato
      </Link>
    </main>
  );
}
