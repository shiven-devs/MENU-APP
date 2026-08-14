import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { connectDB } from "../lib/db";
import { Category } from "../lib/models/Category";
import { MenuItem } from "../lib/models/MenuItem";
import { Restaurant } from "../lib/models/Restaurant";
import { User } from "../lib/models/User";

const DEMO_EMAIL = "demo@plate.dev";
const DEMO_PASSWORD = "Demo12345";

const photos = {
  tikka:
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
  grill:
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
  chaat:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  curry:
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
  butter:
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  dal: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
  naan: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
  rice: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=800&q=80",
  sweet:
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80",
  drink:
    "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
  noodles:
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
};

type SeedItem = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  isSpecial?: boolean;
  isAvailable?: boolean;
  imageUrl: string;
};

const menu: { category: string; items: SeedItem[] }[] = [
  {
    category: "Starters",
    items: [
      { name: "Paneer Tikka", description: "Cottage cheese, peppers, mint chutney.", price: 220, isVeg: true, isSpecial: true, imageUrl: photos.tikka },
      { name: "Hara Bhara Kebab", description: "Spinach and peas, crumb fried.", price: 190, isVeg: true, imageUrl: photos.tikka },
      { name: "Corn Cheese Balls", description: "Melted cheese, sweet corn.", price: 180, isVeg: true, imageUrl: photos.chaat },
      { name: "Dahi Puri", description: "Off the tawa today — listed so you can see unavailable styling.", price: 120, isVeg: true, isAvailable: false, imageUrl: photos.chaat },
      { name: "Aloo Tikki Chaat", description: "Potato patties, chutneys, sev.", price: 140, isVeg: true, imageUrl: photos.chaat },
      { name: "Chicken Malai Tikka", description: "Creamy yogurt marinade, charcoal.", price: 280, isVeg: false, imageUrl: photos.grill },
      { name: "Chicken 65", description: "Spicy, curry leaves, yogurt.", price: 260, isVeg: false, imageUrl: photos.grill },
      { name: "Fish Amritsari", description: "Ajwain batter, river fish.", price: 320, isVeg: false, imageUrl: photos.grill },
      { name: "Mutton Seekh Kebab", description: "Minced mutton, rumali.", price: 340, isVeg: false, imageUrl: photos.grill },
      { name: "Chilli Garlic Prawns", description: "Indo-Chinese toss.", price: 380, isVeg: false, isSpecial: true, imageUrl: photos.grill },
    ],
  },
  {
    category: "Soups",
    items: [
      { name: "Tomato Shorba", description: "Cumin, cream swirl.", price: 110, isVeg: true, imageUrl: photos.soup },
      { name: "Sweet Corn Veg", description: "Classic cloudy broth.", price: 120, isVeg: true, imageUrl: photos.soup },
      { name: "Manchow Veg", description: "Fried noodles on top.", price: 130, isVeg: true, imageUrl: photos.soup },
      { name: "Hot & Sour Veg", description: "Vinegar, chilli, tofu.", price: 130, isVeg: true, imageUrl: photos.soup },
      { name: "Palak Soup", description: "Spinach, garlic, pepper.", price: 120, isVeg: true, imageUrl: photos.soup },
      { name: "Mushroom Soup", description: "Cream, thyme.", price: 140, isVeg: true, imageUrl: photos.soup },
      { name: "Chicken Manchow", description: "Clear heat, crunchy noodles.", price: 150, isVeg: false, imageUrl: photos.soup },
      { name: "Chicken Hot & Sour", description: "Pepper-forward.", price: 150, isVeg: false, imageUrl: photos.soup },
      { name: "Chicken Clear Soup", description: "Ginger, spring onion.", price: 140, isVeg: false, imageUrl: photos.soup },
      { name: "Mutton Paya Shorba", description: "Weekend pot — currently unavailable.", price: 180, isVeg: false, isAvailable: false, imageUrl: photos.soup },
    ],
  },
  {
    category: "Tandoor",
    items: [
      { name: "Tandoori Broccoli", description: "Mustard, hung curd.", price: 240, isVeg: true, imageUrl: photos.tikka },
      { name: "Malai Paneer Tikka", description: "Cashew marinade.", price: 250, isVeg: true, isSpecial: true, imageUrl: photos.tikka },
      { name: "Tandoori Aloo", description: "Baby potatoes, ajwain.", price: 190, isVeg: true, imageUrl: photos.tikka },
      { name: "Stuffed Mushroom", description: "Cheese, tandoor.", price: 230, isVeg: true, imageUrl: photos.tikka },
      { name: "Tandoori Chicken Half", description: "Classic red masala.", price: 320, isVeg: false, imageUrl: photos.grill },
      { name: "Tandoori Chicken Full", description: "For the table.", price: 580, isVeg: false, imageUrl: photos.grill },
      { name: "Afghani Chicken", description: "White marinade, cream.", price: 340, isVeg: false, imageUrl: photos.grill },
      { name: "Lamb Chops", description: "Two pieces, charcoal.", price: 520, isVeg: false, isSpecial: true, imageUrl: photos.grill },
      { name: "Tandoori Fish Tikka", description: "Mustard oil, chilli.", price: 360, isVeg: false, imageUrl: photos.grill },
      { name: "Mixed Grill Platter", description: "Kebab sampler for two.", price: 690, isVeg: false, imageUrl: photos.grill },
    ],
  },
  {
    category: "Mains — Veg",
    items: [
      { name: "Dal Makhani", description: "Overnight black lentils.", price: 260, isVeg: true, isSpecial: true, imageUrl: photos.dal },
      { name: "Dal Tadka", description: "Ghee, jeera, garlic.", price: 180, isVeg: true, imageUrl: photos.dal },
      { name: "Palak Paneer", description: "Spinach gravy.", price: 250, isVeg: true, imageUrl: photos.curry },
      { name: "Kadai Paneer", description: "Capsicum, kadai masala.", price: 270, isVeg: true, imageUrl: photos.curry },
      { name: "Paneer Butter Masala", description: "Tomato-cashew gravy.", price: 280, isVeg: true, imageUrl: photos.butter },
      { name: "Malai Kofta", description: "Cottage-cheese dumplings.", price: 270, isVeg: true, imageUrl: photos.curry },
      { name: "Chole Masala", description: "Amritsari chickpeas.", price: 200, isVeg: true, imageUrl: photos.curry },
      { name: "Baingan Bharta", description: "Smoky aubergine.", price: 220, isVeg: true, imageUrl: photos.curry },
      { name: "Veg Kolhapuri", description: "Coconut, red chilli.", price: 230, isVeg: true, imageUrl: photos.curry },
      { name: "Mushroom Do Pyaza", description: "Twice the onion.", price: 240, isVeg: true, imageUrl: photos.curry },
    ],
  },
  {
    category: "Mains — Non-veg",
    items: [
      { name: "Butter Chicken", description: "Kasuri methi, cream.", price: 340, isVeg: false, isSpecial: true, imageUrl: photos.butter },
      { name: "Chicken Tikka Masala", description: "Onion-tomato gravy.", price: 330, isVeg: false, imageUrl: photos.butter },
      { name: "Kadai Chicken", description: "Coarsely ground spices.", price: 320, isVeg: false, imageUrl: photos.curry },
      { name: "Chicken Chettinad", description: "Pepper, star anise.", price: 330, isVeg: false, imageUrl: photos.curry },
      { name: "Mutton Rogan Josh", description: "Kashmiri chilli.", price: 420, isVeg: false, imageUrl: photos.curry },
      { name: "Keema Matar", description: "Minced mutton, peas.", price: 380, isVeg: false, imageUrl: photos.curry },
      { name: "Fish Curry", description: "Kokum, coconut.", price: 360, isVeg: false, imageUrl: photos.curry },
      { name: "Prawn Masala", description: "Coastal gravy.", price: 420, isVeg: false, imageUrl: photos.curry },
      { name: "Egg Curry", description: "Two eggs, onion masala.", price: 210, isVeg: false, imageUrl: photos.curry },
      { name: "Nalli Nihari", description: "Slow lamb shank — chef’s special nights only.", price: 480, isVeg: false, isAvailable: false, imageUrl: photos.curry },
    ],
  },
  {
    category: "Breads",
    items: [
      { name: "Tandoori Roti", description: "Whole wheat.", price: 30, isVeg: true, imageUrl: photos.naan },
      { name: "Butter Naan", description: "Leavened, tandoor.", price: 50, isVeg: true, imageUrl: photos.naan },
      { name: "Garlic Naan", description: "Butter, coriander.", price: 70, isVeg: true, isSpecial: true, imageUrl: photos.naan },
      { name: "Cheese Naan", description: "Stuffed mozzarella.", price: 90, isVeg: true, imageUrl: photos.naan },
      { name: "Lachha Paratha", description: "Layered, ghee.", price: 60, isVeg: true, imageUrl: photos.naan },
      { name: "Missi Roti", description: "Besan, ajwain.", price: 45, isVeg: true, imageUrl: photos.naan },
      { name: "Roomali Roti", description: "Handkerchief thin, pair.", price: 50, isVeg: true, imageUrl: photos.naan },
      { name: "Kulcha Onion", description: "Amritsari stuffing.", price: 70, isVeg: true, imageUrl: photos.naan },
      { name: "Bhatura", description: "Two pieces, fried.", price: 80, isVeg: true, imageUrl: photos.naan },
      { name: "Plain Naan", description: "No butter.", price: 40, isVeg: true, imageUrl: photos.naan },
    ],
  },
  {
    category: "Rice & Biryani",
    items: [
      { name: "Steamed Rice", description: "Basmati.", price: 120, isVeg: true, imageUrl: photos.rice },
      { name: "Jeera Rice", description: "Cumin tempering.", price: 140, isVeg: true, imageUrl: photos.rice },
      { name: "Veg Pulao", description: "Peas, whole spices.", price: 180, isVeg: true, imageUrl: photos.rice },
      { name: "Veg Biryani", description: "Dum, saffron, raita.", price: 240, isVeg: true, imageUrl: photos.rice },
      { name: "Paneer Biryani", description: "Cottage cheese dum.", price: 280, isVeg: true, imageUrl: photos.rice },
      { name: "Egg Biryani", description: "Two eggs, dum.", price: 260, isVeg: false, imageUrl: photos.rice },
      { name: "Chicken Biryani", description: "Hyderabadi dum.", price: 320, isVeg: false, isSpecial: true, imageUrl: photos.rice },
      { name: "Mutton Biryani", description: "Bone-in, long grain.", price: 380, isVeg: false, imageUrl: photos.rice },
      { name: "Prawn Biryani", description: "Coastal dum.", price: 400, isVeg: false, imageUrl: photos.rice },
      { name: "Curd Rice", description: "Tempered, mustard.", price: 150, isVeg: true, imageUrl: photos.rice },
    ],
  },
  {
    category: "Chinese",
    items: [
      { name: "Veg Spring Roll", description: "Three pieces.", price: 160, isVeg: true, imageUrl: photos.noodles },
      { name: "Gobi Manchurian", description: "Dry, spring onion.", price: 200, isVeg: true, imageUrl: photos.noodles },
      { name: "Paneer Chilli", description: "Capsicum, soy.", price: 240, isVeg: true, imageUrl: photos.noodles },
      { name: "Veg Hakka Noodles", description: "High flame toss.", price: 190, isVeg: true, imageUrl: photos.noodles },
      { name: "Veg Fried Rice", description: "Wok, garlic.", price: 180, isVeg: true, imageUrl: photos.rice },
      { name: "Chicken Manchurian", description: "Gravy or dry.", price: 260, isVeg: false, imageUrl: photos.noodles },
      { name: "Chilli Chicken", description: "Classic Indo-Chinese.", price: 270, isVeg: false, isSpecial: true, imageUrl: photos.noodles },
      { name: "Chicken Hakka Noodles", description: "Egg noodles, veg.", price: 220, isVeg: false, imageUrl: photos.noodles },
      { name: "Chicken Fried Rice", description: "Wok hei.", price: 210, isVeg: false, imageUrl: photos.rice },
      { name: "American Chop Suey", description: "Crispy noodles, sauce.", price: 250, isVeg: true, imageUrl: photos.noodles },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Gulab Jamun", description: "Two pieces, warm syrup.", price: 110, isVeg: true, imageUrl: photos.sweet },
      { name: "Rasmalai", description: "Two discs, saffron milk.", price: 130, isVeg: true, isSpecial: true, imageUrl: photos.sweet },
      { name: "Gajar Halwa", description: "Seasonal carrot, khoya.", price: 140, isVeg: true, imageUrl: photos.sweet },
      { name: "Kheer", description: "Rice, cardamom, nuts.", price: 120, isVeg: true, imageUrl: photos.sweet },
      { name: "Kulfi Falooda", description: "Malai kulfi, rose.", price: 150, isVeg: true, imageUrl: photos.sweet },
      { name: "Brownie Sizzler", description: "Hot chocolate, ice cream.", price: 180, isVeg: true, imageUrl: photos.sweet },
      { name: "Rasgulla", description: "Two pieces, light syrup.", price: 100, isVeg: true, imageUrl: photos.sweet },
      { name: "Moong Dal Halwa", description: "Slow ghee roast.", price: 160, isVeg: true, imageUrl: photos.sweet },
      { name: "Phirni", description: "Earthen cup, saffron.", price: 130, isVeg: true, imageUrl: photos.sweet },
      { name: "Ice Cream Scoop", description: "Vanilla or chocolate.", price: 90, isVeg: true, imageUrl: photos.sweet },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Masala Chaas", description: "Salted buttermilk, cumin.", price: 60, isVeg: true, imageUrl: photos.drink },
      { name: "Sweet Lassi", description: "Hung yogurt, sugar.", price: 80, isVeg: true, imageUrl: photos.drink },
      { name: "Mango Lassi", description: "Alphonso, cardamom.", price: 90, isVeg: true, isSpecial: true, imageUrl: photos.drink },
      { name: "Fresh Lime Soda", description: "Sweet, salt, or mixed.", price: 70, isVeg: true, imageUrl: photos.drink },
      { name: "Jaljeera", description: "Mint, roasted cumin.", price: 70, isVeg: true, imageUrl: photos.drink },
      { name: "Filter Coffee", description: "South Indian decoction.", price: 50, isVeg: true, imageUrl: photos.drink },
      { name: "Masala Chai", description: "Ginger, cardamom.", price: 40, isVeg: true, imageUrl: photos.drink },
      { name: "Fresh Orange Juice", description: "No concentrate.", price: 110, isVeg: true, imageUrl: photos.drink },
      { name: "Watermelon Cooler", description: "Mint, lime.", price: 100, isVeg: true, imageUrl: photos.drink },
      { name: "Thums Up", description: "300ml bottle.", price: 50, isVeg: true, imageUrl: photos.drink },
    ],
  },
];

async function seed() {
  if (menu.length < 10 || menu.some((block) => block.items.length < 10)) {
    throw new Error("Seed data must have 10 categories with 10 items each.");
  }

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

  const slugTaken = await Restaurant.findOne({ slug: "spice-garden" });
  if (slugTaken) {
    await MenuItem.deleteMany({ restaurantId: slugTaken._id });
    await Category.deleteMany({ restaurantId: slugTaken._id });
    await Restaurant.deleteOne({ _id: slugTaken._id });
  }

  const user = await User.create({
    name: "Demo Owner",
    email: DEMO_EMAIL,
    passwordHash: await bcrypt.hash(DEMO_PASSWORD, 12),
    role: "owner",
  });

  const restaurant = await Restaurant.create({
    ownerId: user._id,
    name: "Spice Garden",
    slug: "spice-garden",
    description:
      "North Indian kitchen with tandoor, Chinese, and a full sweet trolley. Scan, browse, tell your waiter.",
    address: "12 MG Road, Bengaluru",
    contactNumber: "+91 98765 43210",
    currency: "₹",
    isOpen: true,
    coverImageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    logoUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=200&q=80",
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

  await MenuItem.insertMany(
    menu.flatMap((block) =>
      block.items.map((item, displayOrder) => ({
        restaurantId: restaurant._id,
        categoryId: categoryIdByName[block.category],
        name: item.name,
        description: item.description,
        price: item.price,
        isVeg: item.isVeg,
        isSpecial: item.isSpecial ?? false,
        isAvailable: item.isAvailable ?? true,
        imageUrl: item.imageUrl,
        displayOrder,
      })),
    ),
  );

  console.log("Demo restaurant ready: 10 categories, 10 items each.");
  console.log("  Login:    http://localhost:3000/login");
  console.log(`  Email:    ${DEMO_EMAIL}`);
  console.log(`  Password: ${DEMO_PASSWORD}`);
  console.log("  Public:   http://localhost:3000/r/spice-garden");
  console.log("  Dashboard:http://localhost:3000/dashboard");

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
