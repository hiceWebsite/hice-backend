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

trainingVideoSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

trainingVideoSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

trainingVideoSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

trainingVideoSchema.statics.isProductExistsByCodeNumber = async function (
  title: string,
) {
  return await TrainingVideoModel.findOne({ title });
};

export const TrainingVideoModel = model<TTrainingVideo>(
  "TrainingVideo",
  trainingVideoSchema,
);
