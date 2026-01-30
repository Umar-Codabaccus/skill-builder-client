import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

function useGetModules(courseId) {
    return useQuery({
        queryKey: ["modules", courseId],
        queryFn: async () => {
            const response = await api.get(`/Module/${courseId}/modules`);
            return response.data.modules;
        },
        onError: () => {
            return [];
        }
    });
}

export { useGetModules };