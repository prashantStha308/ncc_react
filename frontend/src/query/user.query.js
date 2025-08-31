import { useQuery } from "@tanstack/eslint-plugin-query";
import { Login, RegisterUser } from "../services/user.services.js";


export const useRegister = (objectData) => {
     return useQuery({
        queryFn: () => RegisterUser(objectData),
        queryKey: [ 'task', [objectData.Name]]
    });
}

export const useLogin = (objectData) => {
    return useQuery({
        queryFn: () => Login(objectData),
        queryKey: ['task', [objectData.email]]
    })
}