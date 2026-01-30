import { NavLink } from "react-router-dom";

function CourseTab({ courseId, context }) {
    const navLinkClass = ({ isActive }) => 
        isActive 
        ? "nav-link active" 
        : "nav-link";
    
    const handleRoute = () => {
        if (context.includes("explore"))
            return "explore-courses";

        return "my-courses";
    }
    return (
        <>
            <div className="container-fluid">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to={`/learner/${handleRoute()}/${courseId}/overview`} className={navLinkClass} end>
                            Overview
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/learner/${handleRoute()}/${courseId}/modules`} className={navLinkClass} end>
                            Modules
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default CourseTab;