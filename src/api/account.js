import { apiFetch } from "./client";

export async function switchAccount(userId, currentRole) {
    const response = await apiFetch("Authentication/switch", {
        method: "POST",
        body: JSON.stringify({ userId, role: currentRole })
    });

    return response;
}

export async function registerInstructorAccount(userId, currentRole) {
    const response = await apiFetch("Learner/register/instructor", {
        method: "POST",
        body: JSON.stringify({ userId, role: currentRole })
    });

    return response;
}