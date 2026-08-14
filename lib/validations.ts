import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  restaurantName: z
    .string()
    .trim()
    .min(2, "Restaurant name must be at least 2 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(60),
});

export const menuItemSchema = z.object({
  name: z.string().trim().min(1, "Item name is required").max(80),
  description: z.string().trim().max(400).optional().default(""),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  categoryId: z.string().min(1, "Pick a category"),
  isVeg: z.coerce.boolean(),
  isAvailable: z.coerce.boolean().optional().default(true),
  isSpecial: z.coerce.boolean().optional().default(false),
  imageUrl: z.string().optional().default(""),
});

export const tableSchema = z.object({
  label: z.string().trim().min(1, "Table label is required").max(40),
});

export const settingsSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  description: z.string().trim().max(500).optional().default(""),
  address: z.string().trim().max(200).optional().default(""),
  contactNumber: z.string().trim().max(30).optional().default(""),
  currency: z.string().trim().min(1).max(8).default("₹"),
  logoUrl: z.string().optional().default(""),
  coverImageUrl: z.string().optional().default(""),
});
