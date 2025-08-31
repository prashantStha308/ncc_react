import { create } from "zustand";
import {
  createTask,
  getTaskById,
  getRecentlyUpdatedTasks,
  getAllTasks,
} from "../services/task.services";

export const useTaskStore = create((set) => ({
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,

  // Fetch all tasks
  fetchAllTasks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllTasks();
      if (res.success) {
        set({ tasks: res.data, loading: false });
      } else {
        set({ error: res.message, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch recently updated tasks
  fetchRecentlyUpdated: async (limit = 10) => {
    set({ loading: true, error: null });
    try {
      const res = await getRecentlyUpdatedTasks(limit);
      if (res.success) {
        set({ tasks: res.data, loading: false });
      } else {
        set({ error: res.message, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Fetch single task by ID
  fetchTaskById: async (taskId) => {
    set({ loading: true, error: null });
    try {
      const res = await getTaskById(taskId);
      if (res.success) {
        set({ currentTask: res.data, loading: false });
      } else {
        set({ error: res.message, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Add task
  addTask: async (listId, taskData) => {
    set({ loading: true, error: null });
    try {
      const res = await createTask(listId, taskData);
      if (res.success) {
        set((state) => ({ tasks: [...state.tasks, res.data], loading: false }));
      } else {
        set({ error: res.message, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Optional: update task in the store
  updateTaskInStore: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.taskId === updatedTask.taskId ? updatedTask : t
      ),
      currentTask:
        state.currentTask?.taskId === updatedTask.taskId
          ? updatedTask
          : state.currentTask,
    }));
  },

  // Optional: remove task from the store
  removeTaskFromStore: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.taskId !== taskId),
      currentTask:
        state.currentTask?.taskId === taskId ? null : state.currentTask,
    }));
  },
}));
