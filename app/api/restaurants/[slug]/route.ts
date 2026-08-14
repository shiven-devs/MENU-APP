import { NextResponse } from "next/server";

import { getPublicMenu } from "@/lib/menu";

/**
 * Public JSON for a restaurant menu.
 * Route Handler (not a Server Action) so a future app/client can fetch it
 * without rendering this Next.js page.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const menu = await getPublicMenu(slug);
  if (!menu) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }
  return NextResponse.json(menu);
}
