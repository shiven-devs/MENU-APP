import { Restaurant } from "@/lib/models/Restaurant";

export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return slug || "restaurant";
}

export async function uniqueSlug(
  name: string,
  excludeRestaurantId?: string,
): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let n = 2;

  while (true) {
    const existing = await Restaurant.findOne({ slug: candidate }).select("_id");
    if (
      !existing ||
      (excludeRestaurantId && existing._id.toString() === excludeRestaurantId)
    ) {
      return candidate;
    }
    candidate = `${base}-${n}`;
    n += 1;
  }
}
