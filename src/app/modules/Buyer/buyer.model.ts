import { Schema, model } from "mongoose";
import { BuyerModel, TBuyer, TUserName } from "./buyer.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const buyerSchema = new Schema<TBuyer, BuyerModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    address: { type: String, default: "" },
    profileImg: { type: String, default: "" },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
buyerSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + " " + this?.name?.lastName;
});

// filter out deleted documents
buyerSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

buyerSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

buyerSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
buyerSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await Buyer.findOne({ email });
  return existingUser;
};

export const Buyer = model<TBuyer, BuyerModel>("Buyer", buyerSchema);
