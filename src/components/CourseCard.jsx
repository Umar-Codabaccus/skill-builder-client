import { Link } from "react-router-dom";

function CourseCard({ course, onArchive, onPublish }) {
    const status = course.courseStatus ? course.courseStatus.toLowerCase() : "";
    const isArchived = status === "archived";
    const isPublished = status === "published";

    let badgeClass = "bg-warning text-dark";

    if (isArchived) {
        badgeClass = "bg-secondary";
    }
    else if (isPublished) {
        badgeClass = "bg-success";
    }

    const handleArchiveClick = () => {
        onArchive(course.courseId);
    };

    const handlePublishClick = () => {
        onPublish(course.courseId);
    };

    return (
        <div className="card shadow-sm mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0" data-testid="course-title">{course.courseTitle}</h5>
                    <span className={`badge ${badgeClass}`}>{course.courseStatus}</span>
                </div>

                <p className="card-text text-muted">{course.courseDescription}</p>

                <div className="d-flex gap-2">
                    <Link
                        to={`/instructor/course/${course.courseId}/lessons`}
                        state={{ course }}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        Manage Lessons
                    </Link>

                    <Link
                        to={`/instructor/course/${course.courseId}/edit`}
                        state={{ course }}
                        className="btn btn-outline-primary btn-sm"
                    >
                        Edit
                    </Link>

                    {!isPublished && !isArchived && (
                        <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={handlePublishClick}
                        >
                            Publish
                        </button>
                    )}

                    {!isArchived && (
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleArchiveClick}
                        >
                            Archive
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CourseCard;