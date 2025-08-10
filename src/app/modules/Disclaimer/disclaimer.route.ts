import express from "express";
import { DisclaimerControllers } from "./disclaimer.controller";
import { DisclaimerValidation } from "./disclaimer.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-disclaimer",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(DisclaimerValidation.createDisclaimerValidationSchema),
  DisclaimerControllers.createDisclaimer,
);

router.get(
  "/",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.buyer),
  DisclaimerControllers.getAllDisclaimers,
);

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  DisclaimerControllers.getSingleDisclaimer,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(DisclaimerValidation.updateDisclaimerValidationSchema),
  DisclaimerControllers.updateDisclaimer,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  DisclaimerControllers.deleteDisclaimer,
);

export const DisclaimerRoutes = router;
