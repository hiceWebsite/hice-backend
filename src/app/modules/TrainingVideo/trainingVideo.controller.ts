import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TrainingVideoServices } from "./trainingVideo.service";

// Create Training Video
const createTrainingVideo = catchAsync(async (req, res) => {
  const result = await TrainingVideoServices.createTrainingVideoIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Training video created successfully",
    data: result,
  });
});

// Get all Training Videos
const getAllTrainingVideos = catchAsync(async (req, res) => {
  const result = await TrainingVideoServices.getAllTrainingVideosFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Training videos retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

// Get single Training Video by ID
const getSingleTrainingVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainingVideoServices.getSingleTrainingVideoFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Training video retrieved successfully",
    data: result,
  });
});

// Update Training Video
const updateTrainingVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainingVideoServices.updateTrainingVideoIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Training video updated successfully",
    data: result,
  });
});

// Soft Delete Training Video
const deleteTrainingVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainingVideoServices.softDeleteTrainingVideo(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Training video deleted successfully",
    data: result,
  });
});

export const TrainingVideoControllers = {
  createTrainingVideo,
  getAllTrainingVideos,
  getSingleTrainingVideo,
  updateTrainingVideo,
  deleteTrainingVideo,
};
