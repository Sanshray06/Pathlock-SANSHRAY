// src/hooks/useTasks.ts
import { useEffect, useState, useCallback } from "react";
import type { Task } from "../types/Task";
import { tasksApi } from "../api/tasksApi";

type LoadingMap = Record<string, boolean>;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<LoadingMap>({});
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage first (fast UI), then refresh from API
  useEffect(() => {
    const raw = localStorage.getItem("tasks");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        console.log("📦 Loaded from localStorage:", parsed);
        setTasks(parsed);
      } catch {
        // ignore parse error
      }
    }
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep localStorage in sync
  useEffect(() => {
    console.log("💾 Saving to localStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getTasks();
      console.log("🔍 API Response:", data);
      console.log("🔍 First task:", data[0]);
      console.log("🔍 First task description:", data[0]?.description);
      setTasks(data);
    } catch (err: any) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (description: string) => {
    setAddLoading(true);
    setError(null);
    try {
      const created: Task = await tasksApi.addTask(description);
      console.log("✅ Task created:", created);
      setTasks(prev => [...prev, created]);
    } catch (err: any) {
      console.error("Add failed:", err);
      setError("Failed to add task");
      throw err;
    } finally {
      setAddLoading(false);
    }
  }, []);

  const setItemLoading = (id: string, v: boolean) =>
    setActionLoading(prev => ({ ...prev, [id]: v }));

  const toggleTaskCompletion = useCallback(async (id: string) => {
    setError(null);
    const t = tasks.find(x => x.id === id);
    if (!t) return;

    const prev = tasks;
    const updated = { ...t, isCompleted: !t.isCompleted };
    setTasks(prevTasks => prevTasks.map(p => (p.id === id ? updated : p)));
    setItemLoading(id, true);

    try {
      await tasksApi.toggleTask(id, updated.isCompleted);
    } catch (err: any) {
      console.error("Toggle failed:", err);
      setError("Failed to toggle task");
      setTasks(prev);
    } finally {
      setItemLoading(id, false);
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id: string) => {
    setError(null);
    const backup = tasks;
    setTasks(prev => prev.filter(t => t.id !== id));
    setItemLoading(id, true);

    try {
      await tasksApi.deleteTask(id);
    } catch (err: any) {
      console.error("Delete failed:", err);
      setError("Failed to delete task");
      setTasks(backup);
    } finally {
      setItemLoading(id, false);
    }
  }, [tasks]);

  return {
    tasks,
    loading,
    addLoading,
    actionLoading,
    error,
    fetchTasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
  };
}