// Type definitions for the Todo application

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
}

export interface TaskPatch {
  completed: boolean;
}

export interface TaskResponse {
  tasks: Task[];
  count: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}