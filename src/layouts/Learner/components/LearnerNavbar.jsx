import { Link, NavLink } from "react-router-dom";

function LearnerNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top px-3 py-2">
                <div className="container-fluid">
                    <Link to="/learner" className="navbar-brand fw-bold text-primary">
                        SkillBuilder
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#learnerNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="learnerNavbar">
                        <ul className="navbar-nav mx-auto gap-3">
                            <li className="nav-item">
                                <NavLink to="/learner" className="nav-link">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/learner/my-courses" className="nav-link">
                                    My Courses
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/learner/explore-courses" className="nav-link">
                                    Explore
                                </NavLink>
                            </li>
                        </ul>

                        {/* Profile image */}
                        <div className="d-flex align-items-center">
                            <img 
                                src="https://i.pravatar.cc/40" 
                                alt="profile"
                                className="rounded-circle"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "cover",
                                    cursor: "pointer"
                                }} />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LearnerNavbar;