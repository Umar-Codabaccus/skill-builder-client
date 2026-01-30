import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (err) {
        return null;
    }
}

export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }

    const decoded = decodeToken(token);
    if (!decoded?.exp) {
        return true;
    }

    const now = Date.now() / 1000;
    return decoded.exp < now;
}