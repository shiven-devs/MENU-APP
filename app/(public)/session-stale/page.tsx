import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default function SessionStalePage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Session is out of date</h1>
      <p className="max-w-md text-muted-foreground">
        You are logged in as an account that no longer has a restaurant. That
        often happens after re-seeding the demo. Sign out, then log in again.
      </p>
      <form action={logoutAction}>
        <Button type="submit">Sign out</Button>
      </form>
    </main>
  );
}
