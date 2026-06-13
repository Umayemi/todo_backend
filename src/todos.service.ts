import crypto from "crypto";
import { promises as fs } from "fs";
import XLSX from "xlsx";
import type { Todo, CreateTodo, UpdateTodo } from "./types/todos";

const FILE = "todos.xlsx";



const ensureExcelFile = async (data: Todo[]) => {
  const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    ws,
    "Todos"
  );

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  await fs.writeFile(FILE, buffer);
};

const readExcelFile = async (): Promise<Todo[]> => {
  try {
    await fs.access(FILE);
  } catch {
    return [];
  }

  const file = await fs.readFile(FILE);
  const wb = XLSX.read(file, { type: "buffer" });

  const ws = wb.Sheets["Todos"];

  if (!ws) {
    return [];
  }

  return XLSX.utils.sheet_to_json<Todo>(ws);
};




export const getAllTodos = async (): Promise<Todo[]> => {
  return await readExcelFile();
};

export const getTodoById = async (
  id: string
): Promise<Todo | undefined> => {
  const todos = await readExcelFile();
  return todos.find((todo) => todo.id === id);
};


export const createTodo = async (
  input: CreateTodo
): Promise<Todo | false> => {
  const todos = await readExcelFile();
    const exists = todos.some(
    (todo) =>
      todo.title.trim().toLowerCase() ===
      input.title.trim().toLowerCase()
  );

  if (exists) {
    return false;
  }
  const timestamp = new Date().toISOString();

  const todo: Todo = {
    id: crypto.randomUUID(),
    title: input.title,
    status: input.status,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  todos.push(todo);
  await ensureExcelFile(todos);
  return todo;
};

export const updateTodo = async (
  id: string,
  input: UpdateTodo
): Promise<Todo | null> => {
  const todos = await getAllTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  const updatedTodo: Todo = {
    ...todo,
    title: input.title ?? todo.title,
    status: input.status ?? todo.status,
    updatedAt: new Date().toISOString()
  };

  const todoIndex = todos.indexOf(todo);
  todos[todoIndex] = updatedTodo;
  await ensureExcelFile(todos);
  return updatedTodo;

};

export const deleteTodo = async (id: string): Promise<boolean> => {
  const todos = await getAllTodos();
    const exists = todos.find(
    (todo) => todo.id === id
  );

  if (!exists) {
    return false;
  }
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  await ensureExcelFile(filteredTodos);
  return true;
};
