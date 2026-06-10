import crypto from "crypto";

import {
  readTodos,
  writeTodos
} from "./todos.repository";
import { CreateTodoInput, Todo, UpdateTodoInput } from "./types/todo";


 const saveTodos = async (todos: Todo[]): Promise<void> => {
  await writeTodos(todos);
};

export const getAllTodos = (): Promise<Todo[]> => {
  return readTodos();
};

export const getTodoById = async (
  id: string
): Promise<Todo | undefined> => {
  const todos = await readTodos();
  return todos.find((todo) => todo.id === id);
};

export const createTodo = async (input: CreateTodoInput): Promise<Todo> => {
  const todos = await readTodos();
  const timestamp = new Date().toISOString();

  const todo: Todo = {
    id: crypto.randomUUID(),
    title: input.title,
    status: input.status,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  todos.push(todo);
  await saveTodos(todos);
  return todo;
}

export async function updateTodo(id: string, input: UpdateTodoInput): Promise<Todo> {
  const todos = await getAllTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  const currentTodo = todos[todoIndex];
  const updatedTodo: Todo = {
    ...currentTodo,
    title: input.title ?? currentTodo.title,
    status: input.status ?? currentTodo.status,
    updatedAt: new Date().toISOString()
  };

  todos[todoIndex] = updatedTodo;
  await saveTodos(todos);
  return updatedTodo;
}

export async function deleteTodo(id: string): Promise<void> {
  const todos = await getAllTodos();
  const filteredTodos = todos.filter((todo) => todo.id !== id);

 

  await saveTodos(filteredTodos);
}
