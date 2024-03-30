import { z } from "zod";

export const registerFormSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "username is required",
    })
    .max(50),
  email: z
    .string()
    .email()
    .min(2, {
      message: "email is required",
    })
    .max(50),
  password: z
    .string()
    .min(1, {
      message: "password is required",
    })
    .max(50),
});
export const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "email is required",
    })
    .max(50),
  password: z
    .string()
    .min(1, {
      message: "password is required",
    })
    .max(50),
});

export const profilerFormSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "username is required",
    })
    .max(50),
  email: z
    .string()
    .email()
    .min(2, {
      message: "email is required",
    })
    .max(50),
  password: z
    .string()
    .min(6, {
      message: "minimum 6 characters required",
    })
    .max(50),
});
