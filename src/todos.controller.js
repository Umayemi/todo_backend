import * as todoService from "./todos.service.js";
export const getAllTodos = async (
  _req,
  res,
)=> {
  try {
    const todos = await todoService.getAllTodos();
    res.status(200).send({
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
  
    res.status(500).send({ message: "Internal Server Error" });
  }

};

export const getTodo = async (
  req,
  res,
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
  req,
  res,
) => {



  try {
    const todo = await todoService.createTodo(req.body);
 if (!todo) {
      return res.status(409).send({
        message: "Todo title already exists",
      });
    }

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
  req,
  res
)=> {


  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    if (!todo) {
      res.status(404).send({ message: "Todo not found" });
      return;
    }
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
  req,
  res,
) => {
  try {
    const deleted = await todoService.deleteTodo(req.params.id);
    if (!deleted) {
      res.status(404).send({ message: "Todo not found" });
      return;
    }
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
