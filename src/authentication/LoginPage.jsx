import { useState } from "react";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const { loginUser, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setErrorMsg("");
        setEmailError("");
        setPasswordError("");

        const result = await loginUser(email, password);

        if (!result.isSuccess) {
            handleError(result.error);
            return;
        }

        if (result.role === "Learner") 
            navigate("/courses");
        else if (result.role === "Instructor")
            navigate("/instructor/courses");

        setErrorMsg("An unexpected error occured. Please try again later.");
    };

    const handleError = (error) => {
        if (typeof error === "string") {
            setErrorMsg(error);
            return;
        }

        setEmailError(error.email);
        setPasswordError(error.password);
    }

    return (
            <div className="container py-5 d-flex justify-content-center">
                <div 
                    className="card shadow-lg border-0"
                    style={{ maxWidth: "450px", width: "100%" }}>
                    <div className="card-body p-4">
                        <h3 className="text-center fw-bold mb-4 text-primary">
                            SkillBuilder
                        </h3>

                        {errorMsg && (
                            <div className="alert alert-danger mt-3" data-testid="login-error">
                                {errorMsg}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <InputForm 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                label="Email"
                                htmlFor="email"
                                value={email}
                                onChange={handleEmailChange}
                                datatestid="email"
                            />
                            {emailError && (
                                <div className="alert alert-danger mt-3" data-testid="login-email-err">
                                    {emailError}
                                </div>
                            )}
                            <InputForm 
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                label="Password"
                                htmlFor="password"
                                value={password}
                                onChange={handlePasswordChange}
                                datatestid="password"
                            />
                            {passwordError && (
                                <div className="alert alert-danger mt-3" data-testid="login-password-err">
                                    {passwordError}
                                </div>
                            )}
                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-primary btn-lg" data-testid="login-btn">
                                    <span>Login</span>

                                    {loading && (
                                        <div
                                            className="spinner-border spinner-border-sm ms-2"
                                            role="status"
                                            aria-hidden="true"
                                            data-testid="spinner"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default LoginPage;