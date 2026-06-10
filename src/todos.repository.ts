import fs from "fs/promises";
import path from "path";
import { Todo } from "./types/todo";

const filePath = path.join(process.cwd(), "data", "todos.json");
const initialValue: Todo[] = [];

const ensureStore = async (): Promise<void> => {
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

export const readTodos = async (): Promise<Todo[]> => {
  await ensureStore();

  const content = await fs.readFile(filePath, "utf-8");

  return JSON.parse(content) as Todo[];
};

export const writeTodos = async (
  todos: Todo[]
): Promise<void> => {
  await ensureStore();

  await fs.writeFile(
    filePath,
    JSON.stringify(todos, null, 2),
    "utf-8"
  );
};