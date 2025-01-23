import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const registerSchema = z
  .object({
    name: requiredString,
    email: requiredString.email("Invalid email"),
    password: requiredString.min(8, "Password must be at least 8 characters"),
    confirmPassword: requiredString.min(
      8,
      "Password must be at least 8 characters",
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export type registerValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: requiredString.email("Invalid email"),
  password: requiredString.min(8, "Password must be at least 8 characters"),
});

export type loginValues = z.infer<typeof loginSchema>;

export const tweetSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachemnts"),
});

export type tweetValues = z.infer<typeof tweetSchema>;

export const updateProfileSchema = z.object({
  name: requiredString.max(20, "Name cannot be longer than 20 characters"),
  username: requiredString
    .max(20, "Username cannot be longer than 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, or hyphens",
    ),
  bio: z
    .string()
    .max(500, "Bio cannot be longer than 500 characters")
    .optional(),
  image: z.string().optional(),
  coverPhoto: z.string().optional(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

export const commentSchema = z.object({
  content: requiredString,
});

export type CommentValues = z.infer<typeof commentSchema>;
