import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
    const user = useSelector(
        (state) => state.user.user
    );

    if (user.isAuthenticated === false) {
        return <Navigate to="/signin" replace />
    }

    return children
}

export default ProtectedRoute;