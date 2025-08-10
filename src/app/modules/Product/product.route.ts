import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-product",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.fields([
    { name: "twoDFile", maxCount: 1 },
    { name: "threeDFile", maxCount: 1 },
  ]),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get(
  "/",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.buyer),
  ProductControllers.getAllProducts,
);

router.get(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.buyer),
  ProductControllers.getSingleProduct,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.fields([
    { name: "twoDFile", maxCount: 1 },
    { name: "threeDFile", maxCount: 1 },
  ]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = router;
