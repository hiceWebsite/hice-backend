import { Schema, model } from "mongoose";
import { TDisclaimer } from "./disclaimer.interface";

const disclaimerSchema = new Schema<TDisclaimer>(
  {
    disDescription: {
      type: String,
      required: true,
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

disclaimerSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

disclaimerSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

disclaimerSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

disclaimerSchema.statics.isProductExistsByCodeNumber = async function (
  disDescription: string,
) {
  return await DisclaimerModel.findOne({ disDescription });
};

export const DisclaimerModel = model<TDisclaimer>(
  "Disclaimer",
  disclaimerSchema,
);
