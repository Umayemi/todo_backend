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


export const findTodoByTitle = async (
  title: string
): Promise<Todo | undefined> => {
  const todos = await readExcelFile();

  return todos.find(
    (todo) =>
      todo.title.trim().toLowerCase() ===
      title.trim().toLowerCase()
  );
};

export const createTodo = async (
  input: CreateTodo
): Promise<Todo> => {
  const todos = await readExcelFile();

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
): Promise<Todo> => {
  const todos = await readExcelFile();

  const index = todos.findIndex((todo) => todo.id === id);

  const updatedTodo: Todo = {
    ...todos[index],
    title: input.title ?? todos[index].title,
    status: input.status ?? todos[index].status,
    updatedAt: new Date().toISOString()
  };

  todos[index] = updatedTodo;

  await ensureExcelFile(todos);

  return updatedTodo;
};


export const deleteTodo = async (id: string): Promise<void> => {
  const todos = await readExcelFile();

  const filteredTodos = todos.filter((todo) => todo.id !== id);

  await ensureExcelFile(filteredTodos);
};