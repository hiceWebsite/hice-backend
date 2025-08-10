import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BuyerServices } from "./buyer.service";

const getSingleBuyer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BuyerServices.getSingleBuyerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Buyer is retrieved succesfully",
    data: result,
  });
});

const getAllBuyers = catchAsync(async (req, res) => {
  const result = await BuyerServices.getAllBuyersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Buyers are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateBuyer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { buyer } = req.body;
  const result = await BuyerServices.updateBuyerIntoDB(id, buyer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Buyer is updated succesfully",
    data: result,
  });
});

const deleteBuyer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BuyerServices.deleteBuyerFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Buyer is deleted succesfully",
    data: result,
  });
});

export const BuyerControllers = {
  getAllBuyers,
  getSingleBuyer,
  deleteBuyer,
  updateBuyer,
};
