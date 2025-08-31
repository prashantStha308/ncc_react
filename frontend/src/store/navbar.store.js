import { create } from "zustand";

const NavbarStore = create((set) => ({
    // States
    currentPage: 'home',
    isSearchActive: false,
    historyStack: [],
    serachKey: "",
    newTaskData: {
        Name: "",
        Desc: ""
    },

    isAddTaskOpen: false,
    spawnPoint: {
      x:0, y:0  
    },
    // Refs
    navbarRef: null,

    setCurrentPage: (page) => set({ currentPage: page }),
    setIsSearchActive: (state) => set({ isSearchActive: state }),
    setSearchKey: (key) => set({ serachKey: key }),
    setNewTaskData: (data) => set({
        newTaskData: {
            Name: data.Name || "",
            Desc: data.Desc || "",
        }
    }
    ),
    setNavbarRef: (ref) => set({ navbarRef: ref }),
    setHistoryStack: (stack) => set({ historyStack: stack }),

    setIsAddTaskOpen: (state) => set({ isAddTaskOpen: state }),
    setSpawnPoint: (obj) => set({spawnPoint: {...obj}}),

    // operations
    pushHistory: (path) => set((state) => ({ historyStack: [...state.historyStack, path] })),

    popHistory: () => set((state) => ({
        historyStack: state.historyStack.slice(0, state.historyStack.length - 1),
    })),

}))

const useNavbarStore = () => NavbarStore()

export default useNavbarStore;