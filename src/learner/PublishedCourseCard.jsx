function PublishedCourseCard({ course, onEnrol, enrolling }) {
    const handleEnrolClick = () => {
        onEnrol(course.courseId);
    };

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm" data-testid="published-course-card">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title" data-testid="course-title">{course.title}</h5>
                    <p className="card-text text-muted flex-grow-1">{course.description}</p>

                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={enrolling}
                        onClick={handleEnrolClick}
                        data-testid="enrol-button"
                    >
                        <span>Enrol</span>

                        {enrolling && (
                            <div
                                className="spinner-border spinner-border-sm ms-2"
                                role="status"
                                aria-hidden="true"
                            >
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PublishedCourseCard;