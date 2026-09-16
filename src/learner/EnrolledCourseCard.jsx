import { Link } from "react-router-dom";

function EnrolledCourseCard({ course }) {
    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm" data-testid="enrolled-card">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title" data-testid="course-title">{course.title}</h5>
                    <p className="text-muted small mb-2">Instructor: {course.instructor}</p>
                    <p className="card-text text-muted flex-grow-1">{course.description}</p>

                    <Link to={`/learn/${course.courseId}`} className="btn btn-primary" data-testid="continue-learning-link">
                        Continue Learning
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EnrolledCourseCard;