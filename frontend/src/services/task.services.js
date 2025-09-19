import axios from "axios";
import { BASEAPI } from "../Constants";

export const createTask = async (listId, objectData) => {
    console.log("LIst ID", listId);
    console.log("Task Data", objectData);
    try {
        const res = await axios.post(`${BASEAPI}/api/task/add/${listId}`, objectData);
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

export const getAllTasks = async (userId) => {
    try {
        const res = await axios.get(`${BASEAPI}/api/task/all/${userId ? userId : ""}`);
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