import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

function useCreateCourse() {
    return useMutation({
        mutationFn: async ({ data, course }) => {
            const response = await api.post(`/Course/${data.id}/create`, course);
            return response.data;
        }
    });
}

export { useCreateCourse };