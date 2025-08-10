/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TDisclaimer } from "./disclaimer.interface";
import { DisclaimerModel } from "./disclaimer.model";

const createDisclaimerIntoDB = async (payload: TDisclaimer) => {
  try {
    const result = await DisclaimerModel.create(payload);
    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create disclaimer");
  }
};

const getAllDisclaimersFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(DisclaimerModel.find(), query)
    .search(["disDescription"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleDisclaimerFromDB = async (id: string) => {
  const result = await DisclaimerModel.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Disclaimer not found");
  }
  return result;
};

const updateDisclaimerIntoDB = async (
  id: string,
  payload: Partial<TDisclaimer>,
) => {
  const result = await DisclaimerModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Disclaimer not found");
  }
  return result;
};

// const deleteDisclaimerFromDB = async (id: string) => {
//   const result = await DisclaimerModel.findByIdAndDelete(id);
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, "Disclaimer not found");
//   }
//   return result;
// };

const deleteDisclaimerFromDB = async (id: string) => {
  const result = await DisclaimerModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const DisclaimerServices = {
  createDisclaimerIntoDB,
  getAllDisclaimersFromDB,
  getSingleDisclaimerFromDB,
  updateDisclaimerIntoDB,
  deleteDisclaimerFromDB,
};
