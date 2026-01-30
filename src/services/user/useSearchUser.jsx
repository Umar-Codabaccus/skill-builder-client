import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

function useSearchUser(search) {
    return useQuery({
        queryKey: ["searchUsers", search],
        queryFn: async ({ queryKey }) => {
            const [, searchValue] = queryKey;
            const response = await api.get("/User/users/search", { params: { search: searchValue }});
            return response.data.users;
        }
    });
}

export { useSearchUser };