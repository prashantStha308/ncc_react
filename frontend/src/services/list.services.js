import axios from "axios";
import { BASEAPI } from "../Constants";

export const createTaskList = async ( objectData) => {
    try {
        const res = await axios.post(`${BASEAPI}/api/tasklist`, objectData);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to create list:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const getAllTaskList = async() => {
    try {
        const res = await axios.get(`${BASEAPI}/api/tasklist/`);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to get tasklist:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}

export const getTaskListById = async (taskId) => {
    try {
        const res = await axios.get(`${BASEAPI}/api/tasklist/${taskId}`);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        return res.data;
    } catch (error) {
        console.error("Failed to get tasklist:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { success: false, message: error.message };
        }
    }
}
