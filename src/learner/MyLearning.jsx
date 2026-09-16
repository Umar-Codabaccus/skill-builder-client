import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { getEnrolledCourses } from "../api/learner";

function MyLearning() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setLoading(true);
        setErrorMsg("");

        const result = await getEnrolledCourses();

        setLoading(false);
        
        if (!result.isSuccess) {
            setErrorMsg(result.error); 
            return;
        }

        setCourses([...result.courses]);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">My Learning</h3>

                <Link to="/courses" className="btn btn-outline-primary">
                    Browse Courses
                </Link>
            </div>

            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {!loading && courses.length === 0 && !errorMsg && (
                <p className="text-muted">
                    You're not enrolled in any courses yet. <Link to="/courses">Browse courses</Link> to get started.
                </p>
            )}

            <div className="row g-3">
                {!loading && courses.map((course) => (
                    <EnrolledCourseCard key={course.courseId} course={course} />
                ))}
            </div>
        </div>
    );
}

export default MyLearning;