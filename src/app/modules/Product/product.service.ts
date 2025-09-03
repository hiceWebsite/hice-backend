/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { ProductSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { deleteImageFromCloudinary } from "../../utils/deleteImageFromCloudinary";

const createProductIntoDB = async (files: any, payload: TProduct) => {
  if (files?.twoDFile) {
    const imageName = `${payload.codeNumber}-2D`;
    const path = files.twoDFile[0].path;
    const cloudinaryResult: any = await sendImageToCloudinary(imageName, path);
    payload.twoDUrl = cloudinaryResult.secure_url;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "2D image file is required");
  }

  if (files?.threeDFile) {
    const imageName = `${payload.codeNumber}-3D`;
    const path = files.threeDFile[0].path;
    const cloudinaryResult: any = await sendImageToCloudinary(imageName, path);
    payload.threeDUrl = cloudinaryResult.secure_url;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, "3D model file is required");
  }

  const result = await Product.create(payload);
  return result;
};
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// //Previous one
// const updateProductIntoDB = async (
//   id: string,
//   files: any,
//   payload: Partial<TProduct>,
// ) => {
//   if (files?.twoDFile) {
//     const imageName = `${payload.codeNumber || id}-2D`;
//     const path = files.twoDFile[0].path;
//     const cloudinaryResult: any = await sendImageToCloudinary(imageName, path);
//     payload.twoDUrl = cloudinaryResult.secure_url;
//   }

//   if (files?.threeDFile) {
//     const imageName = `${payload.codeNumber || id}-3D`;
//     const path = files.threeDFile[0].path;
//     const cloudinaryResult: any = await sendImageToCloudinary(imageName, path);
//     payload.threeDUrl = cloudinaryResult.secure_url;
//   }

//   const result = await Product.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });
//   return result;
// };

//New one
const updateProductIntoDB = async (
  id: string,
  files: any,
  payload: Partial<TProduct>,
) => {
  // ✅ First fetch existing product to get old URLs
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  //If 2D file provided → delete old one from Cloudinary → upload new
  if (files?.twoDFile) {
    if (existingProduct.twoDUrl) {
      const oldPublicId = existingProduct.twoDUrl
        .split("/")
        .slice(-1)[0]
        .split(".")[0];
      await deleteImageFromCloudinary(oldPublicId);
    }

    const imageName = `${payload.codeNumber || id}-2D`;
    const path = files.twoDFile[0].path;
    const cloudinaryResult: any = await sendImageToCloudinary(imageName, path);
    payload.twoDUrl = cloudinaryResult.secure_url;
  }

  //If 3D file provided → delete old one from Cloudinary → upload new
  if (files?.threeDFile) {
    if (existingProduct.threeDUrl) {
      const oldPublicId = existingProduct.threeDUrl
        .split("/")
        .slice(-1)[0]
        .split(".")[0];
      await deleteImageFromCloudinary(oldPublicId);
    }

    const imageName = `${payload.codeNumber || id}-3D`;
    const path = files.threeDFile[0].path;
    const cloudinaryResult: any = await sendImageToCloudinary(imageName, path);
    payload.threeDUrl = cloudinaryResult.secure_url;
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
