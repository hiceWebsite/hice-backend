/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { Buyer } from "./buyer.model";
import { BuyerSearchableFields } from "./buyer.constant";
import { TBuyer } from "./buyer.interface";

const getAllBuyersFromDB = async (query: Record<string, unknown>) => {
  const buyerQuery = new QueryBuilder(Buyer.find(), query)
    .search(BuyerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await buyerQuery.modelQuery;
  const meta = await buyerQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleBuyerFromDB = async (id: string) => {
  const result = await Buyer.findById(id);
  return result;
};

const updateBuyerIntoDB = async (id: string, payload: Partial<TBuyer>) => {
  const { name, ...remainingBuyerData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingBuyerData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Buyer.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBuyerFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedBuyer = await Buyer.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedBuyer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete buyer");
    }

    // get user _id from deletedAdmin
    const userId = deletedBuyer.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedBuyer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const BuyerServices = {
  getAllBuyersFromDB,
  getSingleBuyerFromDB,
  updateBuyerIntoDB,
  deleteBuyerFromDB,
};
