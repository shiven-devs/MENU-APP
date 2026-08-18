import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/SignupForm";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-[oklch(0.98_0.01_80)] px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/10">
        <BrandLogo href="/" size="sm" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Open your kitchen</h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          One form creates your owner account and restaurant profile.
        </p>
        <SignupForm />
      </div>
    </main>
  );
}
