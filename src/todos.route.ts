import { Router } from "express";
import {
getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "./todos.controller";
const router = Router();

router.get("/todos", getAllTodos);
router.get("/todos/:id", getTodo);
router.post("/todos", createTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
