import { Schema, model } from "mongoose";
import { ProductModel, TProduct } from "./product.interface";

const productSchema = new Schema<TProduct, ProductModel>(
  {
    codeNumber: {
      type: String,
      required: [true, "Code number is required"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    twoDUrl: {
      type: String,
      required: [true, "2D image URL is required"],
    },
    threeDUrl: {
      type: String,
      required: [true, "3D model URL is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

productSchema.statics.isProductExistsByCodeNumber = async function (
  codeNumber: string,
) {
  return await Product.findOne({ codeNumber });
};

export const Product = model<TProduct, ProductModel>("Product", productSchema);
