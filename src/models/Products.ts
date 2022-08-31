import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    product_title: { type: String },
    product_subtitle: { type: String },
    ref_int: { type: Number },
    posters_layouts: { type: Array },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
