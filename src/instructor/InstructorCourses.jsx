import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getMyCourses, archiveCourse, publishCourse } from "../api/instructor";
import SwitchRoleButton from "../authentication/SwitchRoleButton";

function InstructorCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        setLoading(true);
        setErrorMsg("");

        const result = await getMyCourses();

        if (result.isSuccess === false) {
            setLoading(false);
            if (result.status = 404) {
                setCourses([]);
                return;
            }
            setErrorMsg(result.error);
        }

        setCourses([...result.courses]);

        setLoading(false);
    };

    const handleArchive = async (courseId) => {
        const confirmed = window.confirm(
            "Archive this course? Students will no longer be able to enrol."
        );

        if (!confirmed) {
            return;
        }

        try {
            setErrorMsg("");
            await archiveCourse(courseId);
            await loadCourses();
        }
        catch (err) {
            setErrorMsg("Unable to archive the course.");
        }
    };

    const handlePublish = async (courseId) => {
        setErrorMsg("");
        const response = await publishCourse(courseId);

        if (response !== null || response !== undefined) {
            if (response.status === 404) {
                setErrorMsg(response.detail);
            } else {
                await loadCourses();
            }
        } else {
            await loadCourses();
        }
    };

    return (
        <div className="container py-5">
            <SwitchRoleButton />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">My Courses</h3>

                <Link to="/instructor/course/create" className="btn btn-primary">
                    Create Course
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
                <p className="text-muted">You haven't created any courses yet.</p>
            )}

            {!loading && courses.map((course) => (
                <CourseCard
                    key={course.courseId}
                    course={course}
                    onArchive={handleArchive}
                    onPublish={handlePublish}
                />
            ))}
        </div>
    );
}

export default InstructorCourses;