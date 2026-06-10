
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "./todos.service.js";



export const listTodos = async (
  _req,
  res,
)=> {
  try {
    const todos = await getAllTodos();
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
    const todo = await getTodoById(req.params.id);
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

export const createTodoHandler = async (
  req,
  res,
) => {



  try {
    const todo = await createTodo(req.body);

    res.status(201).json({
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateTodoHandler = async (
  req,
  res
)=> {


  try {
    const todo = await updateTodo(req.params.id, req.body);

    res.status(200).json({
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteTodoHandler = async (
  req,
  res,
) => {
  try {
    await deleteTodo(req.params.id);
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
