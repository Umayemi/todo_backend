import { Router } from "express";
import {
getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "./todos.controller";
import {  bodyValidator, queryValidator, paramsValidator} from "./middlewares/validator";
import { getTodosSchema, createTodoSchema, updateTodoSchema } from "./schemas/todo";

const router = Router();
router.get("/todos",queryValidator(getTodosSchema), getAllTodos);
router.get("/todos/:id", getTodo);
router.post("/todos",  bodyValidator(createTodoSchema),createTodo);
router.patch("/todos/:id",paramsValidator(updateTodoSchema), updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
