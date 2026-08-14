import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const restaurantSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    logoUrl: { type: String, default: "" },
    coverImageUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    address: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    currency: { type: String, default: "₹" },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

export type RestaurantDoc = InferSchemaType<typeof restaurantSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Restaurant: Model<RestaurantDoc> =
  (mongoose.models.Restaurant as Model<RestaurantDoc> | undefined) ??
  mongoose.model<RestaurantDoc>("Restaurant", restaurantSchema);
