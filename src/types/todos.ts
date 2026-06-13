type Status = "doing" | "ongoing" | "completed";

export interface CreateTodo {
  title: string;
  status: Status;
}

export interface Todo {
  id: string;
  title: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTodo {
  title?: string;
  status?: Status;
}