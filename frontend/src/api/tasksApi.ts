// src/api/tasksApi.ts
import axios from "axios";
import type { Task } from "../types/Task";

const API_BASE = "http://localhost:5109/api/tasks";

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    const res = await axios.get<Task[]>(API_BASE);
    return res.data;
  },
  addTask: async (description: string): Promise<Task> => {
    const res = await axios.post<Task>(API_BASE, { description });
    return res.data;
  },
  toggleTask: async (id: string, isCompleted: boolean): Promise<void> => {
    // backend PUT expects full Task or at least { isCompleted }
    await axios.put(`${API_BASE}/${id}`, { isCompleted });
  },
  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
