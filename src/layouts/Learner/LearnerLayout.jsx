import { Outlet } from "react-router-dom";
import LearnerNavbar from "./components/LearnerNavbar";

function LearnerLayout() {
    return (
        <>
            <LearnerNavbar />
            <Outlet />
        </>
    );
}

export default LearnerLayout;