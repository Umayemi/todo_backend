import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./todos.service";

import {
createTodoSchema,
updateTodoSchema
} from "./validators/todoValidator";
import { formatZodErrors } from "./utils/zodErrorFormatter";

type TodoParams = {
  id: string;
};

export const listTodos = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const todos = await getAllTodos();
    res.status(200).send({
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
  
    res.status(500).send({ message: "Internal Server Error" });
  }

};

export const getTodo = async (
  req: Request<TodoParams>,
  res: Response,
): Promise<void> => {
  try {
    const todo = await getTodoById(req.params.id);
      if (!todo) {
        res.status(404).send({ message: "Todo not found" });
        return;
      }
    res.status(200).send({
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }

};

export const createTodoHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = createTodoSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: formatZodErrors(result.error.issues),
    });
    return;
  }

  try {
    const todo = await createTodo(result.data);

    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTodoHandler = async (
  req: Request<TodoParams>,
  res: Response
): Promise<void> => {
  const result = updateTodoSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: formatZodErrors(result.error.issues),
    });
    return;
  }

  try {
    const todo = await updateTodo(req.params.id, result.data);

    res.status(200).json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteTodoHandler = async (
  req: Request<TodoParams>,
  res: Response,
): Promise<void> => {
  try {
    await deleteTodo(req.params.id);
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
