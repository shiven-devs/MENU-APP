import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * MenuItem is scoped to a restaurant AND a category so a later cart/order
 * model can reference itemId without rewriting this collection. We do not
 * store cart or order fields here.
 */
const menuItemSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: "" },
  isVeg: { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
  isSpecial: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
});

menuItemSchema.index({ restaurantId: 1, categoryId: 1, displayOrder: 1 });

export type MenuItemDoc = InferSchemaType<typeof menuItemSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const MenuItem: Model<MenuItemDoc> =
  (mongoose.models.MenuItem as Model<MenuItemDoc> | undefined) ??
  mongoose.model<MenuItemDoc>("MenuItem", menuItemSchema);
