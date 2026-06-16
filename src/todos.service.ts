
import type { Todo, CreateTodo, UpdateTodo } from "./types/todos";
import { getDB } from "./config/db";
import { Collection, ObjectId } from "mongodb";
import { Request } from "express";
const dbCollection = (): Collection<Todo> => getDB().collection("todos");





export const getAllTodos = async (req: Request): Promise<Todo[]> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
   const title = req.query.search as string;
  const status = req.query.status as string;

  const filter: Record<string, unknown> = {};

  if (title) {
    filter.title = {
      $regex: title,
      $options: "i", 
    };
  }

  if (status) {
    filter.status = status.toLowerCase();
  }

  const todos = await dbCollection().find(filter).skip((page - 1)  * limit).limit(limit).toArray();
  return todos;
};

export const getTodoById = async (
  id: string
): Promise<Todo | null> => {
  const todo = await dbCollection().findOne({_id: new ObjectId(id) });
  return todo
};


export const findTodoByTitle = async (
  title: string
): Promise<Todo | null> => {
  const todo = await dbCollection().findOne({
    title: {
      $regex: `^${title}$`,
      $options: "i",
    },
  });

  return todo;
};
export const createTodo = async (
  input: CreateTodo
): Promise<Todo> => {


  const timestamp = new Date().toISOString();

  const todo: Todo = {
    title: input.title,
    status: input.status,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  await dbCollection().insertOne(todo);
  return todo;
};

export const updateTodo = async (
  id: string,
  input: UpdateTodo
): Promise<Todo | null> => {
  const todo = await  dbCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...input,
        updatedAt: new Date().toISOString()
      }
    },
        { returnDocument: "after" },
  );
;


  return todo;
};


export const deleteTodo = async (id: string): Promise<void> => {
 await dbCollection().findOneAndDelete({ _id: new ObjectId(id) });
};