import { useMemo, useState } from "react";
import LessonContentViewer from "./LessonContentViewer";

function LessonProgressRow({ lesson, orderNumber, onStart, onComplete, actioning }) {
    const [showContent, setShowContent] = useState(false);

    const isNotStarted = lesson.lessonProgressId === "00000000-0000-0000-0000-000000000000";
    const isCompleted = Boolean(lesson.isCompleted);
    const hasUrl = Boolean(lesson.url);

    const actionLabel = useMemo(() => {
        if (isCompleted) return "Watch";
        if (isNotStarted) return "Start";
        return "Continue";
    }, [isCompleted, isNotStarted]);

    const handlePrimaryClick = () => {
        if (showContent === true) {
            setShowContent(false);
            return;
        }
        setShowContent(true);
        if (!isCompleted && isNotStarted && onStart) {
            onStart(lesson.lessonId);
        }
    };

    const handleCompleteClick = () => {
        if (onComplete) {
            onComplete(lesson.lessonProgressId);
        }
    };

    return (
        <div className="list-group-item px-3 py-3">
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div>
                    <span className="badge bg-light text-dark me-2">{orderNumber}</span>
                    <span className="fw-semibold">{lesson.title}</span>

                    {isCompleted && (
                        <span className="badge bg-success ms-2">Completed</span>
                    )}
                </div>

                <div className="d-flex gap-2">
                    {!isCompleted && (
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            disabled={actioning}
                            onClick={handlePrimaryClick}
                        >
                            {hasUrl ? (showContent ? "Hide" : actionLabel) : actionLabel}
                        </button>
                    )}

                    {!isCompleted && (
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            disabled={actioning}
                            onClick={handleCompleteClick}
                        >
                            Mark Complete
                        </button>
                    )}
                </div>
            </div>

            {showContent && hasUrl && <LessonContentViewer lesson={lesson} />}
        </div>
    );
}

export default LessonProgressRow;