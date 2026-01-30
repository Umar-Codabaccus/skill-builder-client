import { useMutation } from "@tanstack/react-query";
import { api } from "./api";

function useRegister() {
    return useMutation({
        mutationFn: async (user) => {
            const response = await api.post("/Auth/register", user);
            return response.data;
        }
    });
}

export { useRegister };