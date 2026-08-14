import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * Table is a first-class entity with its own _id. A future "send order to
 * staff" flow can attach orders to tableId without changing this shape.
 * qrCodeUrl stores the public menu path (not a PNG); the PNG is generated on demand.
 */
const tableSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },
    label: { type: String, required: true, trim: true },
    qrCodeUrl: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

tableSchema.index({ restaurantId: 1, label: 1 }, { unique: true });

export type TableDoc = InferSchemaType<typeof tableSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Table: Model<TableDoc> =
  (mongoose.models.Table as Model<TableDoc> | undefined) ??
  mongoose.model<TableDoc>("Table", tableSchema);
