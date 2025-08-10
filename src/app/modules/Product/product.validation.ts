import { z } from "zod";

export const createProductValidationSchema = z.object({
  body: z.object({
    codeNumber: z.string().min(1, "Code number is required"),
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title cannot be more than 100 characters"),
    category: z.string().min(1, "Category is required"),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    codeNumber: z.string().min(1, "Code number is required").optional(),
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title cannot be more than 100 characters")
      .optional(),
    category: z.string().min(1, "Category is required").optional(),
    twoDUrl: z.string().optional(),
    threeDUrl: z.string().optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
