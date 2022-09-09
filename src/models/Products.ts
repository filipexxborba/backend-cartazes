import mongoose, { model, Schema } from "mongoose";

interface IPoster {
  title: string;
  subtitle?: string;
  quant_parc?: number | null;
  value?: string;
  valuePreviously?: string;
  unidade_venda?: string;
  ref_int?: number | string;
  validate?: string;
  stock?: string;
  _id?: string;
}

const productSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    product_title: { type: String },
    product_subtitle: { type: String },
    ref_int: { type: Number },
    posters_layouts: Array<IPoster>,
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
