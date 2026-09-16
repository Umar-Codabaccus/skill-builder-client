const BASE_URL = "https://localhost:7105/api"; // TODO: replace with your actual API base URL

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    
    const  response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        let errorBody = null;

        try {
            errorBody = await response.json();
        }
        catch (err) {
            // Response had no JSON body (e.g. a plain 401/403/500) — that's fine.
        }

        const problem = await response.json();

        const error = new Error(problem.title);
        error.status = response.status;
        error.problem = problem;

        throw error;
    }

    // Handle 204 No Content (archive/publish/update/delete endpoints) —
    // calling .json() on an empty body throws, so check first.
    const contentLength = response.headers.get("content-length");

    if (response.status === 204 || contentLength === "0") {
        return null;
    }

    return await response.json();
}