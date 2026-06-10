import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string({
      error: "title is required",
    })
    .trim()
    .min(1, "title is required"),

  status: z.enum(["todo", "doing", "completed"], {
    error: "status must be one of: todo, doing, completed",
  }),
});

export const updateTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "title must be a non-empty string")
    .optional(),

  status: z.enum(["todo", "doing", "completed"]).optional(),
});