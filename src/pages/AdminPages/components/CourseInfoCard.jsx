
function CourseInfoCard({ description, level }) {
    return (
        <>
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="fw-bold">
                        Course Information
                    </h5>

                    <p className="text-muted mt-2">
                        {description}
                    </p>

                    <div className="mt-3">
                        <span className="badge bg-info">
                            {level}
                        </span>
                    </div>

                    <hr />

                    <div className="d-flex gap-2">
                        <button
                            type="button"
                            className="btn btn-outline-primary w-100"
                        >
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-danger w-100"
                        >
                            <i className="bi bi-trash me-2"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseInfoCard;