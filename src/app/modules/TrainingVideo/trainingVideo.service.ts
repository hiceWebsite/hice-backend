/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { TTrainingVideo } from "./trainingVideo.interface";
import { TrainingVideoModel } from "./trainingVideo.model"; // assuming your model file exports it
import { TrainingVideoSearchableFields } from "./trainingVideo.constant"; // optional: if you have searchable fields

// Create training video
const createTrainingVideoIntoDB = async (payload: TTrainingVideo) => {
  try {
    const result = await TrainingVideoModel.create(payload);
    return result;
  } catch (err) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to create training video",
    );
  }
};

// Get all training videos (with filters, pagination, search)
const getAllTrainingVideosFromDB = async (query: Record<string, unknown>) => {
  const trainingVideoQuery = new QueryBuilder(
    TrainingVideoModel.find({ isDeleted: false }), // exclude soft-deleted items
    query,
  )
    .search(TrainingVideoSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await trainingVideoQuery.modelQuery;
  const meta = await trainingVideoQuery.countTotal();

  return {
    meta,
    result,
  };
};

// Get single training video
const getSingleTrainingVideoFromDB = async (id: string) => {
  const result = await TrainingVideoModel.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Training video not found");
  }
  return result;
};

// Update training video
const updateTrainingVideoIntoDB = async (
  id: string,
  payload: Partial<TTrainingVideo>,
) => {
  const result = await TrainingVideoModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Training video not found or deleted",
    );
  }

  return result;
};

// Soft delete training video
const softDeleteTrainingVideo = async (id: string) => {
  const result = await TrainingVideoModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Training video not found or already deleted",
    );
  }

  return result;
};

export const TrainingVideoServices = {
  createTrainingVideoIntoDB,
  getAllTrainingVideosFromDB,
  getSingleTrainingVideoFromDB,
  updateTrainingVideoIntoDB,
  softDeleteTrainingVideo,
};
