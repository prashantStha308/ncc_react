import { create } from "zustand";

export const useWindowStore = create((set) => ({
    addTaskWindowStatus: false,
    addTaskSpawnPoint: { x: 0, y: 0 },

    setAddTaskWindowStatus: (status) => set({ addTaskWindowStatus: status }),
    setAddTaskSpawnPoint: (obj) => set({ spawnPoint: { ...obj } }),

}))