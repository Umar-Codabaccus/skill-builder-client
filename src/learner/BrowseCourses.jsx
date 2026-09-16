import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PublishedCourseCard from "./PublishedCourseCard";
import { getPublishedCourses, enrolInCourse } from "../api/learner";
import SwitchRoleButton from "../authentication/SwitchRoleButton";
import { useAuth } from "../context/AuthContext";

function BrowseCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [enrollingId, setEnrollingId] = useState(null);

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    const navigateToMyLearning = () => {
        navigate("/learn");
    }

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            setErrorMsg("");

            const response = await getPublishedCourses();
            const publishedCourses = response?.publishedCourses ?? [];

            setCourses(publishedCourses);
        }
        catch (err) {
            if (response.status === 404) {
                setCourses([]);
            }
            setErrorMsg("Unable to load published courses.");
        }
        finally {
            setLoading(false);
        }
    };

    const handleEnrol = async (courseId) => {

        setEnrollingId(courseId);
        setLoading(true);
        setErrorMsg("");

        const result = await enrolInCourse(courseId);

        if (!result.isSuccess) {
            setLoading(false);
            setErrorMsg(result.error);
            setEnrollingId(null);
            return;
        }

        navigate("/learn");
        setEnrollingId(null);
    };

    return (
        <div className="container py-5">
            {errorMsg && (
                <div className="alert alert-danger mt-3" data-testid="error-msg">
                    {errorMsg}
                </div>
            )}

            <nav className="navbar navbar-expand-lg bg-white border rounded-3 shadow-sm px-3 mb-4">
                <div className="container-fluid p-0">
                    <div className="d-flex align-items-center">
                        <SwitchRoleButton setErrorMsg={setErrorMsg}/>
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#learnerNavbar"
                        aria-controls="learnerNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="learnerNavbar"
                    >
                        <ul className="navbar-nav align-items-lg-center">
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-primary ms-lg-2"
                                    onClick={navigateToMyLearning}
                                    data-testid="my-courses-btn"
                                >
                                    My Courses
                                </button>
                            </li>

                            <li className="nav-item">
                                <a href="/profile" className="nav-link">
                                    Profile
                                </a>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger ms-lg-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <h3 className="fw-bold text-primary mb-4">Browse Courses</h3>

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && courses.length === 0 && !errorMsg && (
                <p className="text-muted" data-testid="no-courses-msg">There are no published courses available right now.</p>
            )}

            <div className="row g-3">
                {!loading && courses.map((course) => (
                    <PublishedCourseCard
                        key={course.courseId}
                        course={course}
                        onEnrol={handleEnrol}
                        enrolling={enrollingId === course.courseId}
                    />
                ))}
            </div>
        </div>
    );
}

export default BrowseCourses;