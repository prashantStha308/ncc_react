import axios from "axios"
import { BASEAPI } from "../Constants"

export const RegisterUser = async (objectData) => {
    try {
        // Validate paxi
        const res = await axios.post(`${BASEAPI}/api/user`, objectData);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data.data;
    } catch (error) {
        console.error("Failed to register user:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const Login = async (objectData) => {
    try {
        // Validate paxi
        const res = await axios.post(`${BASEAPI}/api/user/login`, objectData);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data.data;
    } catch (error) {
        console.error("Failed to login:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}
