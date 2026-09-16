import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

function RoleBasedRoute({ allowedRoles }) {
    const { user } = useAuth();

    const role = localStorage.getItem("role");

    // if (!user)
    //     return <Navigate to="/login" replace />;

    const location = useLocation();

    console.log(role);

    if (!allowedRoles.includes(role)) {
        switch (role) {
            case "Learner":
                return <Navigate to="/courses" replace />;

            case "Instructor":
                return <Navigate to="/instructor/courses" replace />;
                
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return <Outlet />;
}

export default RoleBasedRoute;