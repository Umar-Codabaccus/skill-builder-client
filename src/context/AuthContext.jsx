import { createContext, useState, useEffect } from "react";
import { decodeToken, isTokenExpired } from "../utils/jwtUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            logout();
            return;
        }

        const decoded = decodeToken(token);
        setUser({
            id: decoded.sub,
            name: decoded.name,
            role: decoded.role,
        });
    }, [token]);

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);

        const decoded = decodeToken(token);
        setUser({
            id: decoded.sub,
            name: decoded.name,
            role: decoded.role,
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContent.Provider value={{ user, token, login, logout}}>
            {children}
        </AuthContent.Provider>
    );
}