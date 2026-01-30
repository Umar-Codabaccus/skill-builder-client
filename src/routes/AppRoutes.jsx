import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LearnerRoutes from "./LearnerRoutes";
import AdminRoutes from "./AdminRoutes";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";

function AppRoutes() {
    return (
        <>
        <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route
                path="/*"   
                element={
                    <ProtectedRoute>
                        <LearnerRoutes />
                        <AdminRoutes />
                    </ProtectedRoute>
                } 
            />
        </Routes>
        </>
    );
}

export default AppRoutes;