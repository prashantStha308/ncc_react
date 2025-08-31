import { useQuery } from "@tanstack/eslint-plugin-query";
import { createTaskList, getAllTaskList, getTaskListById } from "../services/list.services";


export const useAddTaskQuery =(listId, objectData) => {
     return useQuery({
        queryFn: () => createTaskList(listId, objectData),
        queryKey: [ 'task', [objectData.Name]]
    });
}

export const useGetAllTasklist = () => {
    return useQuery({
        queryFn: getAllTaskList(),
        queryKey: ['all Tasks']
    })
}

export const useGetTaskById = (taskId) => {
    return useQuery({
        queryFn: () => getTaskListById(taskId),
        queryKey: ['task', [taskId]]
    })
}