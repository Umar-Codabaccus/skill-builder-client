import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

function useUpdateUser() {
    return useMutation({
        mutationFn: async (user) => {
            const response = await api.put(`/User/update/${user.id}`, user);
            return response.data;
        }
    });
}

export { useUpdateUser }