import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const categorySchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    index: true,
  },
  name: { type: String, required: true, trim: true },
  displayOrder: { type: Number, default: 0 },
});

categorySchema.index({ restaurantId: 1, displayOrder: 1 });

export type CategoryDoc = InferSchemaType<typeof categorySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Category: Model<CategoryDoc> =
  (mongoose.models.Category as Model<CategoryDoc> | undefined) ??
  mongoose.model<CategoryDoc>("Category", categorySchema);
