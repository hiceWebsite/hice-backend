import { v2 as cloudinary } from "cloudinary";

import config from "../config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const deleteImageFromCloudinary = (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
