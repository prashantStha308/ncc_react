import { useQuery } from "@tanstack/eslint-plugin-query";
import { createTask, getTaskById } from "../services/task.services";


export const useAddTaskQuery =(listId, objectData) => {
     return useQuery({
        queryFn: () => createTask(listId, objectData),
        queryKey: [ 'task', [objectData.Name]]
    });
}

export const useGetTaskById = (taskId) => {
    return useQuery({
        queryFn: () => getTaskById(taskId),
        queryKey: ['task', [taskId]]
    })
}