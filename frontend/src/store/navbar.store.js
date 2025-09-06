import { create } from "zustand";

const NavbarStore = create((set) => ({
    // States
    currentPage: 'home',
    isSearchActive: false,
    historyStack: [],
    serachKey: "",
    // Refs
    navbarRef: null,

    setCurrentPage: (page) => set({ currentPage: page }),
    setIsSearchActive: (state) => set({ isSearchActive: state }),
    setSearchKey: (key) => set({ serachKey: key }),

    setNavbarRef: (ref) => set({ navbarRef: ref }),
    setHistoryStack: (stack) => set({ historyStack: stack }),


    // operations
    pushHistory: (path) => set((state) => ({ historyStack: [...state.historyStack, path] })),

    popHistory: () => set((state) => ({
        historyStack: state.historyStack.slice(0, state.historyStack.length - 1),
    })),

}))

const useNavbarStore = () => NavbarStore()

export default useNavbarStore;