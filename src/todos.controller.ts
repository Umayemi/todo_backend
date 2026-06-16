import { Request, Response } from "express";
import * as todoService from "./todos.service";

export const getAllTodos = async (
  req: Request,
  res: Response,
)=> {
  try {
    const todos = await todoService.getAllTodos(req);
    res.status(200).send({
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
  
    res.status(500).send({ message: "Internal Server Error" });
  }

};

export const getTodo = async (
  req: Request<{ id: string }>,
  res:Response,
) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
      if (!todo) {
        res.status(404).send({ message: "Todo not found" });
        return;
      }
    res.status(200).send({
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }

};

export const createTodo = async (
  req: Request,
  res: Response,
) => {



  try {
    const existingTodo = await todoService.findTodoByTitle(req.body.title);
    if (existingTodo) {
      res.status(409).send({ message: "Todo already exists" });
      return;
    }
    const todo = await todoService.createTodo(req.body);


    res.status(201).send({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const updateTodo = async (
  req: Request<{ id: string }>,
  res: Response,
)=> {


  try {

    const existingTodo = await todoService.getTodoById(req.params.id);
     if (!existingTodo) {
      res.status(404).send({ message: "Todo not found" });
      return;
    }
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.status(200).send({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
       const existingTodo = await todoService.getTodoById(req.params.id);
     if (!existingTodo) {
      res.status(404).send({ message: "Todo not found" });
      return;
    }
    await todoService.deleteTodo(req.params.id);
  
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
