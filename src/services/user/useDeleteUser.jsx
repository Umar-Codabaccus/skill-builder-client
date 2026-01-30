import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

function useDeleteUser() {
    return useMutation({
        mutationFn: async (user) => {
            const response = await api.delete(`/User/delete/${user.id}`);
            return response.data;
        }
    });
}

export { useDeleteUser };