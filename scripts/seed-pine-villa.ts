import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { connectDB } from "../lib/db";
import { Category } from "../lib/models/Category";
import { MenuItem } from "../lib/models/MenuItem";
import { Restaurant } from "../lib/models/Restaurant";
import { User } from "../lib/models/User";
import { assignFoodPhoto } from "./food-photos";

/**
 * Second demo restaurant, separate from Spice Garden (`seed-demo.ts`).
 * Each owner can only have one restaurant, so this gets its own login.
 */
const DEMO_EMAIL = "pinevilla@plate.dev";
const DEMO_PASSWORD = "PineVilla123";
const SLUG = "pine-villa";

/** Unsplash crop URL. Each dish should get its own photo id. */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

/** Pexels crop URL — used when we need extra chicken / wrap / curry shots. */
const p = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

type SeedItem = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isSpecial?: boolean;
  imageUrl: string;
};

const menu: { category: string; items: SeedItem[] }[] = [
  {
    category: "Soup",
    items: [
      { name: "Veg Soup", description: "Clear vegetable broth.", price: 140, isVeg: true, imageUrl: u("1547595628-c61a29f496f0") },
      { name: "Manchow Soup", description: "Indo-Chinese broth, fried noodles on top.", price: 140, isVeg: true, imageUrl: u("1569718212165-3a8278d5f624") },
      { name: "Sweet Corn Soup", description: "Creamy corn, mild and cloudy.", price: 140, isVeg: true, imageUrl: u("1476718406336-bb5a5b2bf6e6") },
      { name: "Mushroom Soup", description: "Button mushrooms, cream.", price: 140, isVeg: true, imageUrl: u("1615485290382-8b4bed74fd38") },
      { name: "Tomato Soup", description: "Tangy tomato, cumin.", price: 140, isVeg: true, imageUrl: u("1547592166-23ac45744acd") },
      { name: "Hot & Sour Soup", description: "Vinegar, chilli, veg.", price: 140, isVeg: true, imageUrl: u("1582878826629-29b7ad1cdc43") },
      { name: "Veg Choupsuey", description: "Crispy noodles, thick veg gravy.", price: 200, isVeg: true, imageUrl: u("1617093727343-374698b1b08d") },
      { name: "Paneer Choupsuey", description: "Crispy noodles, paneer gravy.", price: 210, isVeg: true, imageUrl: u("1551183053-bf91a1d81141") },
      { name: "Chicken Choupsuey", description: "Crispy noodles, chicken gravy.", price: 230, isVeg: false, imageUrl: u("1603133872878-684f208fb84b") },
      { name: "Chicken Manchow", description: "Peppered chicken broth, crunchy noodles.", price: 150, isVeg: false, imageUrl: u("1555126634-323283e090fa") },
      { name: "Chicken Hot & Sour", description: "Chicken, vinegar, chilli.", price: 150, isVeg: false, imageUrl: u("1512055564184-0cb6cb36b339") },
    ],
  },
  {
    category: "Appetizers — Veg",
    items: [
      { name: "Veg Pakoda", description: "Mixed vegetable fritters.", price: 140, isVeg: true, imageUrl: u("1601050690597-df0568f70950") },
      { name: "Onion Pakoda", description: "Crisp onion bhaji.", price: 160, isVeg: true, imageUrl: u("1506354666786-959d664ea809") },
      { name: "Paneer Pakoda", description: "Cottage cheese, gram-flour batter.", price: 180, isVeg: true, imageUrl: u("1601050690117-94f5f6fa8bd7") },
      { name: "Veg Crispy", description: "Batter-fried vegetables, chilli toss.", price: 140, isVeg: true, imageUrl: u("1546069901-ba9599a7e63c") },
      { name: "Paneer Crispy", description: "Golden paneer, pepper salt.", price: 210, isVeg: true, imageUrl: u("1567188040759-fb8a883dc6d8") },
      { name: "Paneer Butter Garlic", description: "Paneer tossed in butter and garlic.", price: 200, isVeg: true, imageUrl: u("1631452180519-c014fe946bc7") },
      { name: "Paneer Majestic", description: "Hyderabadi-style yoghurt chilli toss.", price: 210, isVeg: true, isSpecial: true, imageUrl: u("1596797038530-2c107229654b") },
      { name: "Paneer 65", description: "Spicy, curry leaves, yoghurt.", price: 230, isVeg: true, isSpecial: true, imageUrl: u("1505253758473-96b7015fcd40") },
      { name: "Paneer Tenders", description: "Crumbed paneer strips.", price: 220, isVeg: true, imageUrl: u("1561758033-d24a305ada36") },
      { name: "Paneer Chilli Dry", description: "Capsicum, soy, dry toss.", price: 200, isVeg: true, imageUrl: u("1588166524941-3bf61a9c41db") },
      { name: "Paneer Chilli Semi Gravy", description: "Same chilli base, extra sauce.", price: 210, isVeg: true, imageUrl: u("1414235077428-7981063eb7b9") },
      { name: "French Fries", description: "Salted potato fries.", price: 120, isVeg: true, imageUrl: u("1573080496219-bb080dd4f877") },
      { name: "Cheesy Fries", description: "Fries, melted cheese.", price: 150, isVeg: true, imageUrl: u("1585109649139-3668154cbec4") },
      { name: "Cheese Balls", description: "Fried cheese spheres.", price: 220, isVeg: true, isSpecial: true, imageUrl: u("1630384060421-4bb5394be3ae") },
      { name: "Babycorn Crispy", description: "Crisp babycorn, pepper salt.", price: 210, isVeg: true, imageUrl: u("1567306301408-9b74779a11af") },
      { name: "Babycorn Chilli", description: "Babycorn, chilli garlic.", price: 200, isVeg: true, imageUrl: u("1536304993881-ff6e97e5d7d7") },
      { name: "American Corn Pepper Salt", description: "Sweet corn, pepper, salt.", price: 190, isVeg: true, imageUrl: u("1476224203421-9acb31577721") },
      { name: "Veg Sandwich", description: "Grilled vegetable sandwich.", price: 100, isVeg: true, imageUrl: u("1528735602780-2552fd46c7af") },
      { name: "Cheese Sandwich", description: "Grilled cheese sandwich.", price: 120, isVeg: true, imageUrl: u("1539252554453-80dab7caea80") },
      { name: "Mushroom Chilli Dry", description: "Button mushrooms, dry chilli.", price: 200, isVeg: true, imageUrl: u("1490645935967-10de6ba17061") },
      { name: "Mushroom Chilli Semi Gravy", description: "Mushroom chilli with sauce.", price: 210, isVeg: true, imageUrl: u("1498831102194-961d8bee9294") },
      { name: "Chilli Potato", description: "Fried potato, Indo-Chinese toss.", price: 200, isVeg: true, imageUrl: u("1630383249896-42e2397198d4") },
      { name: "Soyabean Chilli Dry", description: "Soya chunks, dry chilli.", price: 200, isVeg: true, imageUrl: u("1512621776951-a57141f2eefd") },
      { name: "Veg Spring Roll", description: "Crispy veg rolls.", price: 140, isVeg: true, imageUrl: u("1563245372-f21724e3856d") },
      { name: "Sanghai Roll", description: "Shanghai-style fried roll.", price: 150, isVeg: true, imageUrl: u("1496116218417-1a781b1c416c") },
      { name: "Veg Manchurian Dry", description: "Fried veg balls, dry toss.", price: 180, isVeg: true, imageUrl: u("1529042410759-befbf282ec64") },
      { name: "Veg Manchurian Gravy", description: "Veg balls in Manchurian gravy.", price: 180, isVeg: true, imageUrl: u("1473093295043-cddbd72dccf4") },
      { name: "Veg Manchurian Chilli", description: "Veg balls, chilli garlic.", price: 170, isVeg: true, imageUrl: u("1621996346565-e3dbc646d9a7") },
      { name: "Paneer Manchurian Dry", description: "Paneer balls, dry toss.", price: 210, isVeg: true, imageUrl: u("1555949258-eb67b1ef0ceb") },
      { name: "Paneer Manchurian Gravy", description: "Paneer balls in gravy.", price: 210, isVeg: true, imageUrl: u("1563379926898-05f4575a45d8") },
    ],
  },
  {
    category: "Appetizers — Non-veg",
    items: [
      { name: "Chicken Cheese Balls (6)", description: "Six crumbed chicken-cheese balls.", price: 240, isVeg: false, imageUrl: u("1619221882220-947b8a13d586") },
      { name: "Chicken Lollipop (6)", description: "Frenched wing lollipops.", price: 240, isVeg: false, imageUrl: u("1604908176997-125f25cc6f3d") },
      { name: "Chicken Drum Stick (8)", description: "Eight fried drumsticks.", price: 210, isVeg: false, imageUrl: u("1598103442097-8b74394b95c0") },
      { name: "Chicken Korean Wings", description: "Sticky glazed Korean-style wings.", price: 260, isVeg: false, imageUrl: u("1527477396000-e27163b481c2") },
      { name: "Chicken Pepper", description: "Black-pepper chicken toss.", price: 249, isVeg: false, isSpecial: true, imageUrl: u("1432139505167-9ec0d9500d70") },
      { name: "Chicken Majestic", description: "Yoghurt chilli chicken.", price: 239, isVeg: false, isSpecial: true, imageUrl: u("1532550907401-a532c00947da") },
      { name: "Chicken Fry", description: "Deep-fried chicken pieces.", price: 260, isVeg: false, imageUrl: u("1562967914-608f82629710") },
      { name: "Chicken Dragon", description: "Indo-Chinese dragon sauce.", price: 239, isVeg: false, imageUrl: u("1467003909585-2f8a72700288") },
      { name: "Chicken Tenders", description: "Crumbed chicken strips.", price: 240, isVeg: false, imageUrl: u("1562967916-ebcd37c62ab4") },
      { name: "Chicken 65", description: "Spicy, curry leaves, yoghurt.", price: 240, isVeg: false, isSpecial: true, imageUrl: u("1626082927389-6cd097cdc6ec") },
      { name: "Chicken Spring Roll", description: "Fried rolls with chicken filling.", price: 160, isVeg: false, imageUrl: u("1610057099431-8c6c56ad27d0") },
      { name: "Chicken Chilli Dry", description: "Capsicum, soy, dry toss.", price: 220, isVeg: false, imageUrl: u("1603360946369-dc9bb6258143") },
      { name: "Chicken Chilli Semi Gravy", description: "Chilli chicken with extra sauce.", price: 230, isVeg: false, imageUrl: u("1565557623262-b51c2513a641") },
      { name: "Chicken Manchurian Dry", description: "Fried chicken, dry Manchurian.", price: 230, isVeg: false, imageUrl: u("1599487488170-d11ec9c172f0") },
      { name: "Chicken Manchurian Gravy", description: "Chicken in Manchurian gravy.", price: 230, isVeg: false, imageUrl: u("1603894584373-5ac82b2ae398") },
      { name: "Egg Chilli (8)", description: "Eight chilli-tossed eggs.", price: 170, isVeg: false, imageUrl: u("1482049016688-2d3e1b311543") },
      { name: "Egg Omelette", description: "Plain omelette.", price: 60, isVeg: false, imageUrl: u("1525351484163-7529414344d8") },
      { name: "Bread Omelette", description: "Omelette with bread.", price: 120, isVeg: false, imageUrl: u("1493770348161-4be78223f58b") },
      { name: "Grilled Chicken Sandwich", description: "Grilled chicken, toasted bread.", price: 140, isVeg: false, imageUrl: u("1553909489-cd47e0907980") },
    ],
  },
  {
    category: "Noodles",
    items: [
      { name: "Veg Noodle", description: "Hakka toss, mixed vegetables.", price: 140, isVeg: true, imageUrl: u("1585032226651-759b368d7246") },
      { name: "Schezwan Noodle", description: "Veg noodles, Schezwan paste.", price: 150, isVeg: true, imageUrl: u("1612874743304-4f4b50d3660c") },
      { name: "Paneer Noodle", description: "Hakka noodles with paneer.", price: 150, isVeg: true, imageUrl: u("1606491956689-2ea866880c84") },
      { name: "Paneer Schezwan Noodle", description: "Paneer, Schezwan toss.", price: 160, isVeg: true, imageUrl: p(2347311) },
      { name: "Veg Butter Chilli Garlic Noodle", description: "Butter, chilli, garlic wok toss.", price: 170, isVeg: true, isSpecial: true, imageUrl: p(2664216) },
      { name: "Chicken Noodle", description: "Hakka noodles with chicken.", price: 170, isVeg: false, imageUrl: p(1410235) },
      { name: "Egg Noodle", description: "Hakka noodles with egg.", price: 150, isVeg: false, imageUrl: p(1907244) },
      { name: "Addon — Chicken", description: "Add chicken to any noodle bowl.", price: 50, isVeg: false, imageUrl: p(2338407) },
      { name: "Addon — Egg", description: "Add egg to any noodle bowl.", price: 30, isVeg: false, imageUrl: u("1484723091739-30c874cb91f9") },
    ],
  },
  {
    category: "Desi Tandoor",
    items: [
      { name: "Hara Bhara Kabab", description: "Spinach and peas patties.", price: 199, isVeg: true, imageUrl: u("1540189549336-e6e99c3679fe") },
      { name: "Veg Seekh Kabab", description: "Minced vegetable skewers.", price: 199, isVeg: true, imageUrl: u("1511690656952-34342bb7c2f2") },
      { name: "Mushroom Tikka", description: "Marinated grilled mushrooms.", price: 250, isVeg: true, imageUrl: u("1540420773420-3366772f4999") },
      { name: "Paneer Tikka", description: "Charred cottage-cheese cubes.", price: 260, isVeg: true, isSpecial: true, imageUrl: p(2474661) },
      { name: "Paneer Malai Tikka", description: "Cream marinade, tandoor.", price: 280, isVeg: true, isSpecial: true, imageUrl: p(2474658) },
      { name: "Chicken Tikka", description: "Spicy red marinade, grilled.", price: 280, isVeg: false, imageUrl: u("1598515214211-89d3c73ae83b") },
      { name: "Chicken Tandoori Full", description: "Whole bird, tandoor masala.", price: 399, isVeg: false, imageUrl: p(616354) },
      { name: "Chicken Tandoori Half", description: "Half bird, tandoor masala.", price: 199, isVeg: false, imageUrl: p(60616) },
      { name: "Tangri Kabab (2 pcs)", description: "Two grilled chicken drumsticks.", price: 130, isVeg: false, imageUrl: p(106343) },
      { name: "Tangri Kabab (4 pcs)", description: "Four grilled chicken drumsticks.", price: 240, isVeg: false, imageUrl: p(410648) },
      { name: "Chicken Malai Kabab", description: "White cream marinade.", price: 280, isVeg: false, imageUrl: p(2313682) },
      { name: "Chicken Reshmi Kabab", description: "Silky cream kabab.", price: 290, isVeg: false, isSpecial: true, imageUrl: p(265393) },
    ],
  },
  {
    category: "Rolls",
    items: [
      { name: "Veg Roll", description: "Paratha wrap, mixed veg.", price: 60, isVeg: true, imageUrl: p(461198) },
      { name: "Paneer Roll", description: "Paratha wrap, paneer.", price: 80, isVeg: true, imageUrl: u("1626700051175-2776515d257f") },
      { name: "Double Paneer Roll", description: "Extra paneer filling.", price: 90, isVeg: true, imageUrl: u("1606755962773-d324e0a13086") },
      { name: "Double Egg Roll", description: "Paratha wrap, double egg.", price: 70, isVeg: false, imageUrl: u("1555939594-58d7cb561ad1") },
      { name: "Double Egg Paneer Roll", description: "Egg and paneer wrap.", price: 100, isVeg: false, imageUrl: u("1568901342147-ba6fc7fda3a0") },
      { name: "Double Egg Double Paneer Roll", description: "Extra egg and paneer.", price: 110, isVeg: false, imageUrl: u("1571091718767-d6ccace2ce9c") },
      { name: "Double Egg Double Chicken Roll", description: "Egg and double chicken.", price: 110, isVeg: false, imageUrl: p(1600711) },
      { name: "Chicken Roll", description: "Paratha wrap, chicken.", price: 80, isVeg: false, imageUrl: p(1603901) },
      { name: "Double Chicken Roll", description: "Extra chicken filling.", price: 90, isVeg: false, imageUrl: p(1639562) },
    ],
  },
  {
    category: "Indian — Veg",
    items: [
      { name: "Kaju Masala", description: "Cashews in rich masala.", price: 230, isVeg: true, isSpecial: true, imageUrl: p(958545) },
      { name: "Kaju Paneer", description: "Cashew and paneer gravy.", price: 250, isVeg: true, imageUrl: p(2679501) },
      { name: "Tomato Kaju Curry", description: "Tomato-cashew curry.", price: 199, isVeg: true, imageUrl: u("1603105037880-880cd4edfb0d") },
      { name: "Methi Chaman", description: "Fenugreek, paneer.", price: 240, isVeg: true, imageUrl: u("1504754524776-8f4f37790ca0") },
      { name: "Paneer Masala", description: "Onion-tomato paneer.", price: 250, isVeg: true, isSpecial: true, imageUrl: p(1117862) },
      { name: "Paneer Do Pyaza", description: "Paneer with double onion.", price: 250, isVeg: true, imageUrl: p(540975) },
      { name: "Paneer Kadhai", description: "Capsicum, kadai masala.", price: 260, isVeg: true, imageUrl: p(566345) },
      { name: "Shahi Paneer", description: "Mughlai cream gravy.", price: 270, isVeg: true, imageUrl: p(1279330) },
      { name: "Paneer Malai Kofta", description: "Cottage-cheese dumplings.", price: 280, isVeg: true, imageUrl: p(1487511) },
      { name: "Paneer Butter Masala", description: "Tomato-cashew, butter.", price: 270, isVeg: true, isSpecial: true, imageUrl: p(1527603) },
      { name: "Paneer Lababdar", description: "Silky tomato gravy.", price: 290, isVeg: true, imageUrl: p(1437267) },
      { name: "Paneer Punjabi", description: "Punjabi dhaba-style gravy.", price: 290, isVeg: true, imageUrl: p(2097090) },
      { name: "Paneer Kolhapuri", description: "Coconut, red chilli heat.", price: 290, isVeg: true, imageUrl: p(1703272) },
      { name: "Paneer Tikka Masala", description: "Grilled paneer in masala.", price: 290, isVeg: true, imageUrl: p(884600) },
      { name: "Mushroom Kadhai", description: "Mushroom, capsicum, kadai.", price: 240, isVeg: true, imageUrl: p(209540) },
      { name: "Mushroom Do Pyaza", description: "Mushroom, double onion.", price: 250, isVeg: true, imageUrl: p(955137) },
      { name: "Mushroom Masala", description: "Mushroom onion-tomato gravy.", price: 240, isVeg: true, imageUrl: p(699953) },
      { name: "Aloo Do Pyaza", description: "Potato, double onion.", price: 220, isVeg: true, imageUrl: p(1640777) },
      { name: "Mix Veg", description: "Seasonal vegetables, masala.", price: 240, isVeg: true, imageUrl: p(1059905) },
      { name: "Dal Tadka", description: "Yellow lentils, ghee tadka.", price: 140, isVeg: true, imageUrl: u("1546833999-b9f581a1996d") },
      { name: "Dal Makhni", description: "Overnight black lentils, cream.", price: 220, isVeg: true, imageUrl: u("1504674900247-0877df9cc836") },
      { name: "Green Salad", description: "Cucumber, tomato, onion, lemon.", price: 50, isVeg: true, imageUrl: p(1211887) },
      { name: "Onion Salad", description: "Sliced onion, lemon, chilli.", price: 35, isVeg: true, imageUrl: p(1055058) },
      { name: "Roasted Papad", description: "Roasted, not fried.", price: 20, isVeg: true, imageUrl: u("1626074353765-517a681e40be") },
      {
        name: "Veg Thali",
        description: "Mix veg, dal, roti, plain rice, papad, salad, rasgulla.",
        price: 169,
        isVeg: true,
        imageUrl: u("1585937421612-70a008356fbe"),
      },
      {
        name: "Special Veg Thali",
        description: "Jeera rice, dal, paneer masala, raita, salad, gulab jamun, 2 butter tandoori roti.",
        price: 199,
        isVeg: true,
        isSpecial: true,
        imageUrl: p(1099680),
      },
    ],
  },
];

async function seed() {
  await connectDB();

  const existing = await User.findOne({ email: DEMO_EMAIL });
  if (existing) {
    const restaurant = await Restaurant.findOne({ ownerId: existing._id });
    if (restaurant) {
      await MenuItem.deleteMany({ restaurantId: restaurant._id });
      await Category.deleteMany({ restaurantId: restaurant._id });
      await Restaurant.deleteOne({ _id: restaurant._id });
    }
    await User.deleteOne({ _id: existing._id });
  }

  const slugTaken = await Restaurant.findOne({ slug: SLUG });
  if (slugTaken) {
    await MenuItem.deleteMany({ restaurantId: slugTaken._id });
    await Category.deleteMany({ restaurantId: slugTaken._id });
    await Restaurant.deleteOne({ _id: slugTaken._id });
  }

  const user = await User.create({
    name: "Pine Villa Owner",
    email: DEMO_EMAIL,
    passwordHash: await bcrypt.hash(DEMO_PASSWORD, 12),
    role: "owner",
  });

  const restaurant = await Restaurant.create({
    ownerId: user._id,
    name: "Pine Villa Café",
    slug: SLUG,
    description:
      "Cafe in Lajpat Children Park, Bhagalpur — Indo-Chinese, tandoor, rolls, and North Indian veg. pinevillacafe.com · Instagram @TeamPVCafe",
    address: "Lajpat Children Park, Swami Vivekanand Path, beside Town Hall, Bhagalpur, Bihar 812001",
    contactNumber: "074828 74888",
    currency: "₹",
    isOpen: true,
    coverImageUrl:
      "https://res.cloudinary.com/dulktk3z3/image/upload/v1787040941/menu-platform/pine-villa/cover.jpg",
    logoUrl:
      "https://res.cloudinary.com/dulktk3z3/image/upload/v1787040942/menu-platform/pine-villa/logo.png",
  });

  const categories = await Category.insertMany(
    menu.map((block, displayOrder) => ({
      restaurantId: restaurant._id,
      name: block.category,
      displayOrder,
    })),
  );

  const categoryIdByName = Object.fromEntries(
    categories.map((category) => [category.name, category._id]),
  );

  const usedPhotos = new Set<string>();
  const items = menu.flatMap((block) =>
    block.items.map((item, displayOrder) => ({
      restaurantId: restaurant._id,
      categoryId: categoryIdByName[block.category],
      name: item.name,
      description: item.description,
      price: item.price,
      isVeg: item.isVeg,
      isSpecial: item.isSpecial ?? false,
      isAvailable: true,
      imageUrl: assignFoodPhoto(item.name, usedPhotos),
      displayOrder,
    })),
  );

  await MenuItem.insertMany(items);

  console.log(`Pine Villa Café ready: ${menu.length} categories, ${items.length} items.`);
  console.log("  Login:     http://localhost:3000/login");
  console.log(`  Email:     ${DEMO_EMAIL}`);
  console.log(`  Password:  ${DEMO_PASSWORD}`);
  console.log("  Public:    http://localhost:3000/r/pine-villa");
  console.log("  Dashboard: http://localhost:3000/dashboard");

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
