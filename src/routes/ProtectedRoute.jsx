import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { loading, isAuthenticated } = useAuth();

    if (loading)
        return <p>Loading...</p>;

    if (!isAuthenticated)
        return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;