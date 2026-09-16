import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { createLesson, deleteLesson, getLessonsByCourse, updateLesson, getCourse } from "../api/instructor";
import { Diameter } from "lucide-react";

function ManageLessons() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [editingLessonId, setEditingLessonId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const initializeLessons = async () => {
            setErrorMsg("");
            setLoading(true);

            const result = await getCourse(courseId);

            if (!result.isSuccess) {
                if (result.status === 401 || result.status === 403) {
                    navigate("/login");
                }

                setLoading(false);
                setErrorMsg(result.error);
                return;
            }

            setCourse(result.course);
            setLessons([...result.course.myCourseLessons])
            setLoading(false);
        };

        initializeLessons();
    }, [courseId]);

    const loadLessons = async () => {
        setErrorMsg("");
        setLoading(true);

        const result = await getCourse(courseId);

        if (!result.isSuccess) {
            if (result.status === 401 || result.status === 403) {
                navigate("/login");
            }

            setLoading(false);
            setErrorMsg(result.error);
            return;
        }

        setCourse(result.course);
        setLessons([...result.course.myCourseLessons])
        setLoading(false);
    }

    const resetForm = () => {
        setTitle("");
        setUrl("");
        setEditingLessonId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim() || !url.trim()) {
            setErrorMsg("Please enter both a lesson title and URL.");
            return;
        }

        setSubmitting(true);
        setErrorMsg("");

        if (editingLessonId) {
            await updateLesson(courseId, editingLessonId, title.trim(), url.trim());
            return;
        }
        
        const result = await createLesson(courseId, title.trim(), url.trim());

        if (!result.isSuccess) {
            setSubmitting(false);

            if (result.titleError || result.urlError) {
                if (result.titleError) setErrorMsg(result.titleError, "\n");
                if (result.urlError) setErrorMsg(result.urlError, "\n");
                return;
            }

            setErrorMsg(result.error);
            return;
        }

        setSubmitting(false);
        await loadLessons();
        resetForm();
    };

    const handleEdit = (lesson) => {
        setEditingLessonId(lesson.lessonId ?? lesson.id);
        setTitle(lesson.title ?? "");
        setUrl(lesson.url ?? "");
    };

    const handleDelete = async (lesson) => {
        const lessonId = lesson.lessonId ?? lesson.id;
        const confirmed = window.confirm(`Delete "${lesson.title}"?`);

        if (!confirmed || !lessonId) {
            return;
        }

        try {
            setErrorMsg("");
            await deleteLesson(courseId, lessonId);
            await loadLessons();
        }
        catch {
            setErrorMsg("Unable to delete the lesson.");
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const displayText = () => {
        if (!course) {
            return "Course";
        }

        return course.title;
    }

    return (
        <div className="container py-5">
            <button type="button" className="btn btn-link ps-0 mb-3" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold text-primary mb-1">Manage Lessons</h3>
                    <p className="text-muted mb-0">{displayText()}</p>
                </div>
                <Link to={`/instructor/course/${courseId}/edit`} state={{ course }} className="btn btn-outline-primary btn-sm">
                    Edit Course
                </Link>
            </div>

            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">{editingLessonId ? "Edit lesson" : "Add a lesson"}</h5>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-5">
                            <label htmlFor="lessonTitle" className="form-label">Lesson title</label>
                            <input
                                id="lessonTitle"
                                className="form-control"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="e.g. Intro to React"
                            />
                        </div>

                        <div className="col-md-5">
                            <label htmlFor="lessonUrl" className="form-label">Lesson URL</label>
                            <input
                                id="lessonUrl"
                                className="form-control"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="col-md-2 d-flex align-items-end">
                            <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                                {submitting ? "Saving..." : editingLessonId ? "Save" : "Add lesson"}
                            </button>
                        </div>
                    </form>

                    {editingLessonId && (
                        <button type="button" className="btn btn-link p-0 mt-3" onClick={resetForm}>
                            Cancel edit
                        </button>
                    )}
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">Lessons</h5>

                    {lessons.length === 0 && (
                        <p className="text-muted mb-0">No lessons have been added to this course yet.</p>
                    )}

                    <div className="list-group">
                        {lessons.map((lesson, index) => (
                            <div key={lesson.lessonId ?? lesson.id ?? `${courseId}-${index}`} className="list-group-item d-flex justify-content-between align-items-start gap-3">
                                <div>
                                    <div className="fw-semibold">{lesson.title}</div>
                                    <a href={lesson.url} target="_blank" rel="noreferrer" className="small text-primary">
                                        {lesson.url}
                                    </a>
                                </div>

                                <div className="btn-group btn-group-sm">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => handleEdit(lesson)}>
                                        Edit
                                    </button>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(lesson)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageLessons;
