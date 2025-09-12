import { create } from "zustand";

export const useWindowStore = create((set) => ({
    addTaskWindowStatus: false,
    createListStatus: false,

    spawnPoint: { x: 0, y: 0 },

    setAddTaskWindowStatus: (status) => set({ addTaskWindowStatus: status }),
    setCreateListStatus: (status) => set({ createListStatus: status }),
    setSpawnPoint: (obj) => set({ spawnPoint: { ...obj } }),

}))