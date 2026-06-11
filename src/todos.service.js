import crypto from "crypto";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

const FILE = "todos.xlsx";


const ensureExcelFile =  (data) => {
const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    ws,
    "Todos"
  );

  XLSX.writeFile(
    wb,
    FILE
  );
};

 const readExcelFile = () => {
  if (!fs.existsSync(FILE))
    return [];

  const wb =
    XLSX.readFile(FILE);

  const ws =
    wb.Sheets["Todos"];

  return XLSX.utils.sheet_to_json(ws);
};




export const getAllTodos = ()=> {
  return readExcelFile();
};

export const getTodoById = async (
  id
) => {
  const todos = await readExcelFile();
  return todos.find((todo) => todo.id === id);
};


export const createTodo = async (input) => {
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

  const todo = {
    id: crypto.randomUUID(),
    title: input.title,
    status: input.status,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  todos.push(todo);
  await ensureExcelFile(todos);
  return todo;
}

export const updateTodo = async (id, input) => {
  const todos = await getAllTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  const updatedTodo= {
    ...todo,
    title: input.title ?? todo.title,
    status: input.status ?? todo.status,
    updatedAt: new Date().toISOString()
  };

  const todoIndex = todos.indexOf(todo);
  todos[todoIndex] = updatedTodo;
  await ensureExcelFile(todos);
  return updatedTodo;

}

export const deleteTodo = async (id) => {
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
}
