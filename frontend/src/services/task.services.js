import axios from "axios";
import { BASEAPI } from "../Constants";

export const createTask = async (listId, objectData) => {
    try {
        const res = await axios.post(`${BASEAPI}/api/task/${listId}/add`, objectData);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to create task:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const getAllTasks = async () => {
    try {
        const res = await axios.get(`${BASEAPI}/api/task/`);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to get task:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const getTaskById = async (taskId) => {
    try {
        const res = await axios.get(`${BASEAPI}/api/task/${taskId}`);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to get task:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const getRecentlyUpdatedTasks = async (limit) => {
    try {
        const res = await axios.get(`${BASEAPI}/api/task/recently-updated?limit=${limit}`);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to get task:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}