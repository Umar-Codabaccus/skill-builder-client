import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

function useCourses() {
    return useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await api.get("Course/courses");
            return response.data;
        }
    });
}

export { useCourses };