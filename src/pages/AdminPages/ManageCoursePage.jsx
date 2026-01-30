import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseHeader from "./components/CourseHeader";
import CourseInfoCard from "./components/CourseInfoCard";
import ModulesSection from "./components/ModulesSection";

function ManageCoursePage() {
    const course = useSelector(state => state.admin.course);
    const navigate = useNavigate();

    const handleClick = () => navigate("/admin/courses");

    return (
        <>
            <div className="container-fluid py-4">
                <CourseHeader
                    id={course.id}
                    title={course.title}
                    status={course.status}
                />

                <div className="row g-4">
                    <div className="col-lg-4">
                        <button 
                            className="border-0 bg-white"
                            onClick={handleClick}>
                            <span className="badge bg-primary">
                                Back
                            </span>
                        </button>
                        <CourseInfoCard 
                            description={course.description}
                            level={course.level}
                        />
                    </div>

                    <div className="col-lg-8">
                        <ModulesSection 
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageCoursePage;