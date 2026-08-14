import Link from "next/link";

import { logoutToLoginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function SwitchAccountBar({ email }: { email: string }) {
  return (
    <div className="mb-6 rounded-lg bg-muted px-3 py-3 text-sm">
      <p>
        Already signed in as <span className="font-medium">{email}</span>.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Button size="sm" asChild>
          <Link href="/dashboard">Go to my dashboard</Link>
        </Button>
        <form action={logoutToLoginAction}>
          <Button size="sm" variant="outline" type="submit">
            Use another owner account
          </Button>
        </form>
      </div>
    </div>
  );
}
