import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

function useUserByEmail(userEmail) {
    return useQuery({
        queryKey: ["user", userEmail],
        queryFn: async ({ queryKey }) => {
            const [, emailValue] = queryKey;
            const response = await api.get("/User/user/email", { params: { email: emailValue }});
            return response.data;
        }
    });
}

export { useUserByEmail }