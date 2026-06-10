import crypto from "crypto";
import fs from "fs/promises";
import path from "path";



const filePath = path.join(process.cwd(), "data", "todos.json");
const initialValue = [];

const ensureStore = async () => {
  const directoryPath = path.dirname(filePath);

  await fs.mkdir(directoryPath, { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(
      filePath,
      JSON.stringify(initialValue, null, 2),
      "utf-8"
    );
  }
};

const readTodos = async () => {
  await ensureStore();

  const content = await fs.readFile(filePath, "utf-8");

  return JSON.parse(content) 
};

 const writeTodos = async (
  todos
) => {
  await ensureStore();

  await fs.writeFile(
    filePath,
    JSON.stringify(todos, null, 2),
    "utf-8"
  );
};





export const getAllTodos = ()=> {
  return readTodos();
};

export const getTodoById = async (
  id
) => {
  const todos = await readTodos();
  return todos.find((todo) => todo.id === id);
};

export const createTodo = async (input) => {
  const todos = await readTodos();
  const timestamp = new Date().toISOString();

  const todo = {
    id: crypto.randomUUID(),
    title: input.title,
    status: input.status,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  todos.push(todo);
  await writeTodos(todos);
  return todo;
}

export async function updateTodo(id, input) {
  const todos = await getAllTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  const currentTodo = todos[todoIndex];
  const updatedTodo= {
    ...currentTodo,
    title: input.title ?? currentTodo.title,
    status: input.status ?? currentTodo.status,
    updatedAt: new Date().toISOString()
  };

  todos[todoIndex] = updatedTodo;
  await writeTodos(todos);
  return updatedTodo;
}

export async function deleteTodo(id) {
  const todos = await getAllTodos();
  const filteredTodos = todos.filter((todo) => todo.id !== id);

 

  await writeTodos(filteredTodos);
}
