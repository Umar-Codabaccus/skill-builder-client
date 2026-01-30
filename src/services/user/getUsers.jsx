import { useQuery } from "@tanstack/react-query"
import { api } from "../api";

function getUsers() {
 return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
        const response = await api.get("/User/users");
        return response.data.users;
    }
 });
}

export { getUsers }