/**
 * Verified Unsplash photo IDs (HTTP 200). next/image only allows
 * images.unsplash.com and Cloudinary — Pexels URLs render as broken.
 */
export function unsplashPhoto(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
}

const soup = [
  "1547592166-23ac45744acd",
  "1547595628-c61a29f496f0",
  "1569718212165-3a8278d5f624",
  "1555126634-323283e090fa",
  "1582878826629-29b7ad1cdc43",
  "1603105037880-880cd4edfb0d",
  "1455619452474-d2be8b1e70cd",
];

const chicken = [
  "1527477396000-e27163b481c2",
  "1562967914-608f82629710",
  "1604908176997-125f25cc6f3d",
  "1626082927389-6cd097cdc6ec",
  "1598515214211-89d3c73ae83b",
  "1599487488170-d11ec9c172f0",
  "1603360946369-dc9bb6258143",
  "1565557623262-b51c2513a641",
  "1467003909585-2f8a72700288",
  "1544025162-d76694265947",
  "1603894584373-5ac82b2ae398",
];

const sandwich = [
  "1528735602780-2552fd46c7af",
  "1553909489-cd47e0907980",
  "1606755962773-d324e0a13086",
  "1550547660-d9450f859349",
  "1594212699903-ec8a3eca50f5",
  "1551782450-a2132b4ba21d",
  "1555939594-58d7cb561ad1",
];

const fries = ["1573080496219-bb080dd4f877", "1561758033-7e924f619b47"];

const noodles = [
  "1585032226651-759b368d7246",
  "1606491956689-2ea866880c84",
  "1617093727343-374698b1b08d",
  "1603133872878-684f208fb84b",
  "1551183053-bf91a1d81141",
  "1555949258-eb67b1ef0ceb",
  "1563379926898-05f4575a45d8",
];

const dumplings = ["1563245372-f21724e3856d", "1496116218417-1a781b1c416c"];

const paneer = [
  "1567188040759-fb8a883dc6d8",
  "1631452180519-c014fe946bc7",
  "1505253758473-96b7015fcd40",
  "1596797038530-2c107229654b",
  "1588166524941-3bf61a9c41db",
];

const curry = [
  "1585937421612-70a008356fbe",
  "1546833999-b9f581a1996d",
  "1511690656952-34342bb7c2f2",
  "1626074353765-517a681e40be",
  "1596560548464-f010549b84d7",
];

const veg = [
  "1546069901-ba9599a7e63c",
  "1512621776951-a57141f2eefd",
  "1540189549336-e6e99c3679fe",
  "1490645935967-10de6ba17061",
  "1504754524776-8f4f37790ca0",
  "1540420773420-3366772f4999",
  "1567306301408-9b74779a11af",
  "1556910103-1c02745aae4d",
  "1601050690597-df0568f70950",
  "1601050690117-94f5f6fa8bd7",
];

const egg = ["1482049016688-2d3e1b311543", "1525351484163-7529414344d8"];

const pizzaWrap = [
  "1565299624946-b28f40a0ae38",
  "1574071318508-1cdbab80d002",
  "1571997478779-2adcbbe9ab2f",
  "1513104890138-7c749659a591",
];

const extra = [
  "1551024506-0bccd828d307",
  "1559339352-11d035aa65de",
  "1517248135467-4c7edcad34c4",
  "1579871494447-9811cf80d66c",
];

export const ALL_FOOD_PHOTO_IDS = [
  ...new Set([
    ...soup,
    ...chicken,
    ...sandwich,
    ...fries,
    ...noodles,
    ...dumplings,
    ...paneer,
    ...curry,
    ...veg,
    ...egg,
    ...pizzaWrap,
    ...extra,
  ]),
];

function groupFor(name: string): string[] {
  const n = name.toLowerCase();
  if (/soup|manchow|hot\s*&\s*sour|choupsuey|chopsuey|shorba/.test(n)) return soup;
  if (/sandwich|burger/.test(n)) return sandwich;
  if (/fries|potato|popcorn/.test(n)) return fries;
  if (/noodle|hakka|schezwan|fried rice/.test(n)) return noodles;
  if (/momos|spring roll|sanghai|shanghai|dumpling|manchurian/.test(n)) return dumplings;
  if (/hara bhara|veg seekh|mushroom tikka/.test(n)) return veg;
  if (/roll|wrap/.test(n)) return [...pizzaWrap, ...sandwich];
  if (/omelette|egg/.test(n) && !/veg/.test(n)) return egg;
  if (
    /chicken|tangri|lollipop|wings|drum/.test(n) ||
    (/tandoori|tikka|kabab|kebab|reshmi/.test(n) && !/paneer|veg |mushroom|hara/.test(n))
  ) {
    return chicken;
  }
  if (/paneer|malai kofta|chaman/.test(n)) return paneer;
  if (/dal|thali|masala|curry|kaju|kadhai|handi|kolhapuri|lababdar|makhni|do pyaza|mix veg|papad/.test(n)) {
    return curry;
  }
  if (/salad|mushroom|corn|pakoda|crispy|soyabean|babycorn/.test(n)) return veg;
  return veg;
}

export function assignFoodPhoto(name: string, used: Set<string>): string {
  const preferred = groupFor(name);
  const unused = preferred.find((id) => !used.has(id));
  if (unused) {
    used.add(unused);
    return unsplashPhoto(unused);
  }
  // Reuse a photo from the same food group (not pizza-for-tandoori leftovers).
  const index = Math.abs(hashString(name)) % preferred.length;
  return unsplashPhoto(preferred[index]);
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return hash;
}

export function isAllowedMenuImageHost(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "images.unsplash.com" || host === "res.cloudinary.com";
  } catch {
    return false;
  }
}
