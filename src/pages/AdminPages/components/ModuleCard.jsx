

function ModuleCard({ title, description }) {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="fw-bold mb-1">
                            {title}
                        </h6>
                        <small className="text-muted">
                            {description}
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModuleCard;