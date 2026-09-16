import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import InputForm from "./InputForm";

function RegistrationPage() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [firstnameErr, setFirstnameErr] = useState("");
    const [lastnameErr, setLastnameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const handleFirstnameChange = (event) => setFirstname(event.target.value);
    const handleLastnameChange = (event) => setLastname(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const { registerUser, loading } = useAuth();

    const navigate = useNavigate();

    const handleError = (error) => {
        if (typeof error === 'string') {
            setErrorMsg(error);
            return;
        }
        
        if (error.firstname)
            setFirstnameErr(error.firstname)

        if (error.lastname)
            setLastnameErr(error.lastname)

        if (error.emailErr)
            setEmailErr(error.emailErr)

        if (error.password)
            setPasswordErr(error.password)

        return;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMsg("");
        setFirstnameErr("");
        setLastnameErr("");
        setEmailErr("");
        setPasswordErr("");
        
        const result = await registerUser(firstname, lastname, email, password);

        if (result.isSuccess === false) {
            handleError(result.error);
        } else {
            navigate("/courses");
        }
    };

    return (
        <>
            <div className="container py-5 d-flex justify-content-center">
                <div 
                    className="card shadow-lg border-0"
                    style={{ maxWidth: "450px", width: "100%" }}>
                    <div className="card-body p-4">
                        <h3 className="text-center fw-bold mb-4 text-primary">
                            SkillBuilder
                        </h3>

                        {errorMsg && (
                            <div className="alert alert-danger mt-3" data-testid="register-error">
                                {errorMsg}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <InputForm 
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="Firstname"
                                label="Firstname"
                                htmlFor="firstname"
                                value={firstname}
                                onChange={handleFirstnameChange}
                                datatestid="firstname"
                            />
                            {firstnameErr && (
                                <div className="alert alert-danger mt-3" data-testid="reg-firstname-err">
                                    {firstnameErr}
                                </div>
                            )}
                            <InputForm 
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Lastname"
                                label="Lastname"
                                htmlFor="lastname"
                                value={lastname}
                                onChange={handleLastnameChange}
                                datatestid="lastname"
                            />
                            {lastnameErr && (
                                <div className="alert alert-danger mt-3" data-testid="reg-lastname-err">
                                    {lastnameErr}
                                </div>
                            )}
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
                            {emailErr && (
                                <div className="alert alert-danger mt-3" data-testid="reg-email-err">
                                    {emailErr}
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
                            {passwordErr && (
                                <div className="alert alert-danger mt-3" data-testid="reg-password-err"> 
                                    {passwordErr}
                                </div>
                            )}

                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-primary btn-lg" data-testid="register-btn">
                                    <span>Create account</span>

                                    {loading && (
                                        <div
                                            className="spinner-border spinner-border-sm ms-2"
                                            role="status"
                                            aria-hidden="true"
                                            data-testid="register-loading"
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
        </>
    );
}

export default RegistrationPage;