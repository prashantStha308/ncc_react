import { create } from "zustand";
import { createTaskList, getAllTaskList, getTaskListById } from "../services/list.services";

export const useListStore = create((set) => ({
  lists: [],
  listDetails: {},
  loading: false,
  error: null,

  // Fetch all task lists
  fetchAllLists: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllTaskList();
      set({ lists: res.data.data, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch lists", loading: false });
    }
  },

  // Fetch a single list by ID
  fetchListById: async (listId) => {
    set({ loading: true, error: null });
    try {
      const res = await getTaskListById(listId);
      set((state) => ({
        listDetails: { ...state.listDetails, [listId]: res.data.data },
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Failed to fetch list", loading: false });
    }
  },

  // Create a new task list
  addList: async (objectData) => {
    set({ loading: true, error: null });
    try {
      const res = await createTaskList(objectData);
      set((state) => ({
        lists: [...state.lists, res.data.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message || "Failed to create list", loading: false });
    }
  },

  reset: () => set({ lists: [], listDetails: {}, loading: false, error: null }),
}));
