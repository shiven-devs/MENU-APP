import { redirect } from "next/navigation";

/** Old per-table QR page — the restaurant has one menu URL now. */
export default function TablesRedirectPage() {
  redirect("/dashboard");
}
