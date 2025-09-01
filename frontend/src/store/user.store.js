import { create } from "zustand";
import { RegisterUser, Login } from "../services/user.services";

export const useUserStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    lists: [],


    setUser: (user) => set({ user }),
    // Register a new user
    register: async (userData) => {
        try {
            const res = await RegisterUser(userData);
            if (res?.success) {
                const { username, user_Id } = res.data;
                set({ user: { username, userId: user_Id } });
                set({ isLoggedIn: true });
            } else {
                console.error("Registration failed:", res?.message);
            }
            return res;
        } catch (err) {
            console.error("Error during registration:", err);
            return { success: false, message: err.message };
        }
    },

    // Login existing user
    login: async (userData) => {
        try {
            console.log(userData);
            const res = await Login(userData);
            console.log(res);
            if (res?.success) {
                const { username, userId } = res.data;
                set({ user: { username, userId } });
                set({ isLoggedIn: true });
            } else {
                console.error("Login failed:", res?.message);
            }
            return res;
        } catch (err) {
            console.error("Error during login:", err);
            return { success: false, message: err.message };
        }
    },

    // Logout user
    logout: () => {
        set({ user: null, lists: [] });
        set({ isLoggedIn: false });
    },

    // Set user lists
    setLists: (lists) => set({ lists }),
}));
