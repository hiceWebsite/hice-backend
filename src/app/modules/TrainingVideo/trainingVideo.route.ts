import express from "express";
import { TrainingVideoControllers } from "./trainingVideo.controller";
import { TrainingVideoValidation } from "./trainingVideo.validation";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-training-video",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(TrainingVideoValidation.createTrainingVideoValidationSchema),
  TrainingVideoControllers.createTrainingVideo,
);

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TrainingVideoControllers.getSingleTrainingVideo,
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(TrainingVideoValidation.updateTrainingVideoValidationSchema),
  TrainingVideoControllers.updateTrainingVideo,
);

router.get(
  "/",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.buyer),
  TrainingVideoControllers.getAllTrainingVideos,
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TrainingVideoControllers.deleteTrainingVideo,
);

export const TrainingVideoRoutes = router;
