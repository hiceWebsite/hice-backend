import { z } from "zod";

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().max(20),
});

export const createBuyerValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    buyer: z.object({
      name: createUserNameValidationSchema,
      email: z.string().email(),
      address: z.string().min(4).optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateBuyerValidationSchema = z.object({
  body: z.object({
    buyer: z.object({
      name: updateUserNameValidationSchema,
      email: z.string().email().optional(),
      address: z.string().min(4).optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createBuyerValidationSchema,
  updateBuyerValidationSchema,
};
