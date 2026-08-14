import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/auth/LoginForm";
import { SwitchAccountBar } from "@/components/auth/SwitchAccountBar";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function LoginPage() {
  const session = await auth();

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-[oklch(0.98_0.01_80)] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Plate
        </Link>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Owner sign in</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Each restaurant has its own owner email. This browser holds one login
          at a time — use another account below to switch.
        </p>
        {session?.user?.email ? (
          <SwitchAccountBar email={session.user.email} />
        ) : null}
        <LoginForm />
      </div>
    </main>
  );
}
