import { Router } from "express";
import {
getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "./todos.controller";
import { validator } from "./middlewares/validator";
import { getTodosSchema, createTodoSchema, updateTodoSchema } from "./schemas/todo";

const router = Router();
router.get("/todos",validator(getTodosSchema), getAllTodos);
router.get("/todos/:id", getTodo);
router.post("/todos",  validator(createTodoSchema),createTodo);
router.patch("/todos/:id",validator(updateTodoSchema), updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
