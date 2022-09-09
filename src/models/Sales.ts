import mongoose, { model, Schema } from "mongoose";

const salesSchema = new Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    products_list: { type: Array },
    branch_list: { type: Array },
    layout: { type: Array },
  },

  {
    timestamps: true,
  }
);

export const Sale = model("Sale", salesSchema);
