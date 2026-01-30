import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

function useSearchCourses(searchText) {
    return useQuery({
        queryKey: ["searchedCourses", searchText],
        queryFn: async ({ queryKey }) => {
            const [, searchValue] = queryKey;
            const response = await api.get("/Course/courses/search", { params: { searchText: searchValue } });
            return response.data;
        }
    });
}

export { useSearchCourses }