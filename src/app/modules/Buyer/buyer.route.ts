import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BuyerControllers } from "./buyer.controller";
import { updateBuyerValidationSchema } from "./buyer.validation";
// import { USER_ROLE } from "../user/user.constant";
// import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  BuyerControllers.getAllBuyers,
);

router.get(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  BuyerControllers.getSingleBuyer,
);

router.patch(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateBuyerValidationSchema),
  BuyerControllers.updateBuyer,
);

router.delete(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  BuyerControllers.deleteBuyer,
);

export const BuyerRoutes = router;
