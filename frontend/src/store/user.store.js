import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegisterUser, Login } from "../services/user.services";

export const useUserStore = create(persist((set) => ({
    user: null,
    isLoggedIn: false,


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
            const res = await Login(userData);
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
        set({ user: null });
        set({ isLoggedIn: false });
    },

}),
    {
        name: 'logged-user',
    }
));
