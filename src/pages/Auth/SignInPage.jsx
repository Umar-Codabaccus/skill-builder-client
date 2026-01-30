import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/userSlice";
import { useLogin } from "../../services/useLogin";

function SignInPage() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = useLogin();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmailInput(event.target.value);
    }

    const handlePassword = (event) => {
        setPasswordInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!emailInput && !passwordInput) {
            setErrorMessage("Email and password fields cannot be empty.");
            return;
        }

        if (!emailInput && passwordInput) {
            setErrorMessage("Please enter your email address");
            return;
        }

        if (!passwordInput && emailInput) {
            setErrorMessage("Please enter your password");
            return;
        }

        const user = {
            email: emailInput,
            password: passwordInput
        }

        login.mutate(user, {
            onSuccess: (data) => {
                const authUser = {
                    email: data.email,
                    role: data.role,
                    isAuthenticated: data.isAuthenticated
                };

                dispatch(setUser(authUser));

                if (data.role === "Learner") {
                    navigate("/learner", { replace: true });
                }

                if (data.role === "Admin") {
                    navigate("/admin", { replace: true });
                }
            },
            onError: (error) => {
                // Server down
                if (!error.response || error.code === "ERR_NETWORK") {
                    setErrorMessage("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 400 || error.response.status === 404) {
                    setErrorMessage("Wrong credentials");
                } else {
                    setErrorMessage("An unexpected error occured");
                    return;
                }
            }
        }); 
    }

    return (
        <>
            <div className="container py-5 d-flex justify-content-center">
                <div className="card shadow-lg border-0" style={{ maxWidth: "420px", width: "100%" }}>
                    <div className="card-body p-4">
                        <h3 className="text-center fw-bold text-primary">
                            SkillBuilder
                        </h3>

                        {errorMessage && (
                            <div className="alert alert-danger mt-3">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="emailInput" 
                                    placeholder="you@example.com"
                                    value={emailInput}
                                    onChange={handleEmail} />
                                <label htmlFor="emailInput">
                                    Email address
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="passwordInput" 
                                    placeholder="Password"
                                    value={passwordInput}
                                    onChange={handlePassword} />
                                <label htmlFor="Password">Password</label>
                            </div>

                            <div className="d-grid">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg"
                                    disabled={login.isLoading}>
                                    {login.isLoading ? 
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true">
                                                    Loading...
                                            </span>
                                        </> 
                                        : "Log into your account"}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-3">
                            <span className="small">Don't have an account?</span>{" "}
                            <Link
                            to="/signup"
                            className="small fw-semibold text-decoration-none text-primary"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignInPage;