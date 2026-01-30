import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../../services/useRegister";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";


function SignUpPage() {
    const register = useRegister();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setRegisterData({
            ...registerData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { firstName, lastName, email, password } = registerData;

        if (!firstName || !lastName || !email || !password) {
            setErrorMessage("All fields must have a value");
            return;
        }

        const user = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        }

        register.mutate(user, {
            onSuccess: (data) => {
                dispatch(setUser({
                    email: data.email,
                    role: data.role,
                    isAutheticated: data.isAuthenticated,
                }))

                if (data.role === "Learner") {
                    navigate("/learner", { replace: true });
                }
            },
            onError: (error) => {
                // Server down
                if (!error.response || error.code === "ERR_NETWORK") {
                    setErrorMessage("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 409) {
                    setErrorMessage("Account already exists. Login instead");
                } else if (error.response.status === 400) {
                    setErrorMessage("Registration failed.");
                } else {
                    setErrorMessage("An expected error occured.")
                }
            }
        });
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div
                className="card shadow-lg border-0"
                style={{ maxWidth: "450px", width: "100%" }}
            >
                <div className="card-body p-4">
                    <h3 className="text-center fw-bold mb-4 text-primary">
                        SkillBuilder
                    </h3>

                    {errorMessage && (
                            <div className="alert alert-danger mt-3">
                                {errorMessage}
                            </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={registerData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="firstName">First Name</label>
                        </div>

                        {/* Last Name */}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={registerData.lastName}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="lastName">Last Name</label>
                        </div>

                        {/* Email */}
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        {/* Password */}
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Create account
                            </button>
                        </div>

                        {/* Already have account */}
                        <div className="text-center">
                            <span className="small">Already have an account? </span>
                            <Link
                                to="/signin"
                                className="small fw-semibold text-primary text-decoration-none"
                            >
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default SignUpPage;