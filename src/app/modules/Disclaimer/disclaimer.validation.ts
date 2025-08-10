import { z } from "zod";

// Create Disclaimer Validation
const createDisclaimerValidationSchema = z.object({
  body: z.object({
    disDescription: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
  }),
});

// Update Disclaimer Validation (partial)
const updateDisclaimerValidationSchema = z.object({
  body: z.object({
    disDescription: z
      .string({
        invalid_type_error: "Description must be a string",
      })
      .optional(),
  }),
});

export const DisclaimerValidation = {
  createDisclaimerValidationSchema,
  updateDisclaimerValidationSchema,
};
