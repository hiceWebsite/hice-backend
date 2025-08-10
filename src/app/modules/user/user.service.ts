/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { TAdmin } from "../Admin/admin.interface";
import { Admin } from "../Admin/admin.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { TBuyer } from "../Buyer/buyer.interface";
import { Buyer } from "../Buyer/buyer.model";

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set admin role
  userData.role = "admin";
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${userData.email}${payload?.name?.firstName}${payload?.name?.lastName}`;
      const path = file?.path;

      ///send image to cloudinary
      const cloudinaryResult: any = await sendImageToCloudinary(
        imageName,
        path,
      );

      const secure_url = cloudinaryResult.secure_url;
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createBuyerIntoDB = async (
  file: any,
  password: string,
  payload: TBuyer,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set buyer role
  userData.role = "buyer";
  //set buyer email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${userData.email}${payload?.name?.firstName}${payload?.name?.lastName}`;
      const path = file?.path;

      ///send image to cloudinary
      const cloudinaryResult: any = await sendImageToCloudinary(
        imageName,
        path,
      );

      const secure_url = cloudinaryResult.secure_url;
      payload.profileImg = secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create buyer");
    }

    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newBuyer = await Buyer.create([payload], { session });

    if (!newBuyer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Buyer");
    }

    await session.commitTransaction();
    await session.endSession();

    return newBuyer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userEmail: string, role: string) => {
  let result = null;
  if (role === "buyer") {
    result = await Buyer.findOne({ email: userEmail }).populate("user");
  }
  if (role === "admin") {
    result = await Admin.findOne({ email: userEmail }).populate("user");
  }

  if (role === "superAdmin") {
    result = await User.findOne({ email: userEmail });
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createAdminIntoDB,
  createBuyerIntoDB,
  getMe,
  changeStatus,
};
