import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkInstructorAccount, registerInstructorAccount, switchAccount } from "../api/auth";
import { useEffect, useState } from "react";

function SwitchRoleButton({ setErrorMsg }) {
    const { user, switchRole, updateUser } = useAuth();
    const navigate = useNavigate();

    const [haveAccount, setHaveAccount] = useState(null);

    useEffect(() => {
        const loadResult = async () => {
            const result = await checkInstructorAccount();

            if (result.haveAccount === null) {
                return;
            }

            setHaveAccount(result.haveAccount);
        }
       
        loadResult();
    }, []);

    const displayText = () => {
        if (!haveAccount) {
            return "Register Instructor Account";
        }

        if (user.role === "Learner") {
            return "Switch to Instructor";
        }

        return "Continue to learn";
    }

    const handleClick = async () => {
        if (!haveAccount) {
            const result = await registerInstructorAccount();

            if (result.error !== null) {
                setErrorMsg(result.error);
                return;
            }

            updateUser(result.token, result.role);

            navigate("/instructor/courses");
        }

        const result = await switchAccount();

        if (result.error !== null) {
            setErrorMsg(result.error);
            return;
        }

        updateUser(result.token, result.role);

        if (result.role === "Learner") {
            navigate("/courses");
        }
        
        navigate("/instructor/courses");
    };

    return (
        <button
            className="btn btn-outline-primary"
            onClick={handleClick}
            data-testid="switch-account-button"
        >
            {displayText()}
        </button>
    );
}

export default SwitchRoleButton;