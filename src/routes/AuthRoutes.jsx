import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/" element={<SignUpPage />} />
            {/* <Route path="/forgot-password" element="" /> */}
        </Routes>
    );
}

export default AuthRoutes;