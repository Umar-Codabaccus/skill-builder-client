import { 
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState    
} from "react";

import { apiFetch } from "../api/client";
import {
    switchAccount,
    registerInstructorAccount
} from "../api/account";
import { register, login } from "../api/auth";

const AuthContext = createContext();

function decodeJwt(token) {
    try {
        const payloadBase64 = token.split(".")[1];
        const normalized = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
        const payloadJson = atob(normalized);

        return JSON.parse(payloadJson);
    }
    catch (err) {
        return null;
    }
}

function extractUserId(token) {
    const claims = decodeJwt(token);

    if (!claims) {
        return null;
    }

    // NOTE: ASP.NET Core's default JWT claim mapping renames
    // ClaimTypes.NameIdentifier to this long URI unless the API disables
    // inbound claim mapping. Falling back to shorter claim names in case
    // that's configured differently. Worth confirming against a real
    // token — this is a workaround for LoginResponse not including
    // userId directly.
    const nameIdentifierClaim =
        claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        ?? claims["nameid"]
        ?? claims["sub"]
        ?? null;

    return nameIdentifierClaim;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (token) {
            setUser({
                token,
                email,
                username,
                role,
                userId: extractUserId(token)
            });
        }

        setLoading(false);
    }, []);

    async function registerUser(firstname, lastname, email, password) {
        setLoading(true);
        const response = await register(firstname, lastname, email, password);
        
        const result = {
            isSuccess: true,
            error: null
        }

        if (response.data === null && response.error) {
            setLoading(false);
            result.isSuccess = false;
            result.error = response.error;
            return result;
        }

        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        const registeredUser = {
            token: data.token,
            email: data.email,
            username: data.username,
            role: data.role
        }

        setUser(registeredUser);

        setLoading(false);

        return result;
    }

    async function loginUser(email, password) {
        const response = await login(email, password);

        const result = {
            isSuccess: true,
            error: null,
            role: null
        }

        if (response.data === null && response.error) {
            setLoading(false);
            result.isSuccess = false;
            result.error = response.error;
            return result;
        }

        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        const authenticatedUser = {
            token: data.token,
            email: data.email,
            username: data.username,
            role: data.role
        }

        setUser(authenticatedUser);

        setLoading(false);

        result.role = authenticatedUser.role;
        
        return result;
    }

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        setUser(null);
    }

    async function switchRole() {
        if (!user) {
            throw new Error("No authenticated user to switch role for.");
        }

        let response;

        try {
            response = await switchAccount(user.userId, user.role);
        }
        catch (err) {
            // Learner doesn't yet have an instructor account
            if (err.status === 404 && user.role === "Learner") {

                await registerInstructorAccount(user.userId, user.role);

                response = await switchAccount(user.userId, user.role);
            }
            else {
                throw err;
            }
        }

        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);

        console.log(`response: ${response}`);
        console.log(`token: ${localStorage.getItem("token") == response.token}`);
        console.log(`role: ${localStorage.getItem("role") == response.role}`);

        const updatedUser = {
            ...user,
            token: response.token,
            role: response.role
        };

        console.log(updatedUser);

        setUser(updatedUser);

        console.log(user);

        return updatedUser;
    }

    function updateUser(token, role) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        const updatedUser = {
            token: token,
            email: localStorage.getItem("email"),
            username: localStorage.getItem("username"),
            role: role
        }

        setUser(updatedUser);
    }

    const value = useMemo(() => ({
        user,
        registerUser,
        loading,
        loginUser,
        logout,
        switchRole,
        updateUser,
        isAuthenticated: !!user
    }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}