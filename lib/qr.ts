import QRCode from "qrcode";

import { publicAppUrl } from "@/lib/owner";

/** One menu URL per restaurant. Every printed sticker should encode this. */
export function restaurantMenuAbsoluteUrl(slug: string): string {
  const origin = publicAppUrl().replace(/\/$/, "");
  return `${origin}/r/${slug}`;
}

export async function qrDataUrlForRestaurant(slug: string): Promise<string> {
  return QRCode.toDataURL(restaurantMenuAbsoluteUrl(slug), {
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}
