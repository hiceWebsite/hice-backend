import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DisclaimerServices } from "./disclaimer.service";

const createDisclaimer = catchAsync(async (req, res) => {
  const result = await DisclaimerServices.createDisclaimerIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Disclaimer created successfully",
    data: result,
  });
});

const getAllDisclaimers = catchAsync(async (req, res) => {
  const result = await DisclaimerServices.getAllDisclaimersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Disclaimers retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleDisclaimer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DisclaimerServices.getSingleDisclaimerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Disclaimer retrieved successfully",
    data: result,
  });
});

const updateDisclaimer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DisclaimerServices.updateDisclaimerIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Disclaimer updated successfully",
    data: result,
  });
});

const deleteDisclaimer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DisclaimerServices.deleteDisclaimerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Disclaimer deleted successfully",
    data: result,
  });
});

export const DisclaimerControllers = {
  createDisclaimer,
  getAllDisclaimers,
  getSingleDisclaimer,
  updateDisclaimer,
  deleteDisclaimer,
};
