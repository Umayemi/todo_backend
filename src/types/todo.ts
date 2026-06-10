export type TodoStatus = "todo" | "doing" | "completed";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  status: TodoStatus;
}

export interface UpdateTodoInput {
  title?: string;
  status?: TodoStatus;
}
