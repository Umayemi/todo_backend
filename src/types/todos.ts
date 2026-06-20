type Status =  "todo"| "doing" | "completed";

export interface CreateTodo {
  title: string;
  status: string;
}

export interface Todo {
  
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTodo {
  title?: string;
  status?: string;
}
