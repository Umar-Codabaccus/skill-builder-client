import { useMutation } from "@tanstack/react-query";
import { api } from "./api";

function useLogin() {
    return useMutation({
        mutationFn: async (user) => {
            const res = await api.post("/Auth/login", user);
            return res.data;
        }
    });
}

export { useLogin };