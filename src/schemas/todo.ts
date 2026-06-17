import { z } from "zod";


const status = ["todo", "doing", "completed"];

const todoBodySchema = z.object({
  title: z.string().min(3),
  status: z.enum(status),
});


export const createTodoSchema = z.object({
  body: todoBodySchema,
});


export const updateTodoSchema = z.object({
  body: todoBodySchema.partial(),
});

export const getTodosSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),

    limit: z.coerce.number()
      .min(1)
      .max(100)
      .optional(),

    status: z.enum(status).optional(),
  }),
});