import { z } from "zod";

// Create validation schema
const createTrainingVideoValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    videoUrl: z.string({
      required_error: "Video URL is required",
      invalid_type_error: "Video URL must be a string",
    }),
  }),
});

// Update validation schema (optional fields)
const updateTrainingVideoValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: "Title must be a string",
      })
      .optional(),
    videoUrl: z
      .string({
        invalid_type_error: "Video URL must be a string",
      })
      .optional(),
    isDeleted: z
      .boolean({
        invalid_type_error: "isDeleted must be a boolean",
      })
      .optional(),
  }),
});

export const TrainingVideoValidation = {
  createTrainingVideoValidationSchema,
  updateTrainingVideoValidationSchema,
};
