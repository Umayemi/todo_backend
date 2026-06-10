import { Router } from "express";
import {
listTodos,
  getTodo,
  createTodoHandler,
  updateTodoHandler,
  deleteTodoHandler
} from "./todos.controller";
const router = Router();

router.get("/todos", listTodos);
router.get("/todos/:id", getTodo);
router.post("/todos", createTodoHandler);
router.patch("/todos/:id", updateTodoHandler);
router.delete("/todos/:id", deleteTodoHandler);

export default router;
