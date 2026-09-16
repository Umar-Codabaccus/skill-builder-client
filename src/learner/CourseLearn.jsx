import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LessonProgressRow from "./LessonProgressRow";
import { getProgress, startLesson, completeLesson } from "../api/learner";

function CourseLearn() {
    const { courseId } = useParams();

    const [lessonProgresses, setLessonProgresses] = useState([]);
    const [percentageCompleted, setPercentageCompleted] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [actioningLessonId, setActioningLessonId] = useState(null);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        setLoading(true);
        setErrorMsg("")

        const result = await getProgress(courseId);

        setLoading(false);

        if (!result.isSuccess) {
            if (result.status === 404) {
                setLessonProgresses([]);
                setPercentageCompleted(0);
                return;
            }

            setErrorMsg(result.error);
            return;
        }

        setLessonProgresses([...result.lessons]);
        setPercentageCompleted(result.percentageCompleted ?? 0);
    };

    const handleStart = async (lessonId) => {
        setActioningLessonId(lessonId);
        setErrorMsg("");

        const result = await startLesson(lessonId);
        await loadProgress();

        setActioningLessonId(null);

        if (!result.isSuccess) {
            if (result.status == 404) {
                setErrorMsg("Cannot complete lesson. You must start.");
                return;
            }

            setErrorMsg(result.error);
            return;
        }
    };

    const handleComplete = async (lessonProgressId) => {
        setActioningLessonId(lessonProgressId);
        setErrorMsg("");

        const result = await completeLesson(lessonProgressId);
        await loadProgress();

        setActioningLessonId(null);

        if (!result.isSuccess) {
            setErrorMsg(result.error);
            return;
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

    return (
        <div className="container py-5">
            <Link to="/learn" className="btn btn-link ps-0 mb-3">
                &larr; Back to My Learning
            </Link>

            <h3 className="fw-bold text-primary mb-3">Course Progress</h3>

            {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
            )}

            <div className="progress mb-4" style={{ height: "24px" }}>
                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${percentageCompleted}%` }}
                    aria-valuenow={percentageCompleted}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {percentageCompleted}%
                </div>
            </div>

            {lessonProgresses.length === 0 && (
                <p className="text-muted">No lessons found for this course yet.</p>
            )}

            <div className="list-group">
                {lessonProgresses.map((lesson, index) => (
                    <LessonProgressRow
                        key={lesson.lessonId}
                        lesson={lesson}
                        orderNumber={index + 1}
                        onStart={handleStart}
                        onComplete={handleComplete}
                        actioning={actioningLessonId === lesson.lessonId}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseLearn;