import { Schema, model } from "mongoose";
import { TTrainingVideo } from "./trainingVideo.interface";

const trainingVideoSchema = new Schema<TTrainingVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const TrainingVideoModel = model<TTrainingVideo>(
  "TrainingVideo",
  trainingVideoSchema,
);
