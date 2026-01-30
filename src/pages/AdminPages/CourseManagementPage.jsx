import { useCourses } from "../../services/course/useCourses";
import { useSearchCourses } from "../../services/course/useSearchCourses";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCourseModal from "./components/AddCourseModal";
import { useDispatch } from "react-redux";
import { setCourseManage } from "../../redux/slices/adminSlice";

function CourseManagementPage() {
    const courses = useCourses();

    const refetchCourses = () => courses.refetch();

    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [addCourseErrMsg, setAddCourseErrMsg] = useState("");
    const [addCourseSuccessMsg, setAddCourseSuccessMsg] = useState("");

    const handleShowAddModalButtonClick = () => {
        setAddCourseErrMsg("");
        setAddCourseSuccessMsg("");
        setShowAddCourseModal(true);
    }

    const [searchCourse, setSearchCourse] = useState("");
    const [searchErr, setSearchErr] = useState("");
    const searchedCourses = useSearchCourses(searchCourse);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchCourse(value);

        if (!value.trim()) {
            setSearchErr("");
            return;
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (!searchCourse.trim()) {
            setSearchErr("Please enter a search value");
            return;
        }
    }

    const listToRender = searchCourse.trim()
        ? searchedCourses.data ?? []
        : courses.data ?? [];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleManageClick = (course) => {
        const c = {
            id: course.id,
            title: course.title,
            description: course.description,
            level: course.level,
            thumbnailUrl: course.thumbnailUrl,
            status: course.status,
            userId: course.userId
        }

        dispatch(setCourseManage(c));
        navigate(`/admin/courses/${course.id}`);
    }
    
    return (
        <>
            <div className="container-fluid py-4">
                <div className="container mb-4">

                    <form className="mb-3" onSubmit={handleSearchSubmit}>
                        <div className="row g-2">
                            
                            {/* Search Input */}
                            <div className="col-8 col-md-10">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder="Search courses..."
                                        aria-label="Search"
                                        value={searchCourse}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="col-2 col-md-1">
                                <button 
                                    type="submit" 
                                    className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center"
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>

                            {/* Add User Button */}
                            <div className="col-2 col-md-1">
                                <button
                                    type="button"
                                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                                    onClick={handleShowAddModalButtonClick}
                                >
                                    <i className="bi bi-plus-circle"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                     {searchErr && (
                        <div className="alert alert-danger mt-3">
                            {searchErr}
                        </div>
                    )}

                    <div className="row g-4">
                        {listToRender?.map((course) => (
                            <div key={course.id} className="col-12 col-sm-6 col-md-4">
                                <div className="card shadow-sm border-0 h-100">
                                    <div className="card-body d-flex flex-column text-center">
                                        <h5 className="fw-bold mb-1">{course.title}</h5>
                                        <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
                                            {course.description}
                                        </p>

                                        <div className="mt-auto d-flex justify-content-center gap-3">
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-primary me-2"
                                                onClick={() => handleManageClick(course)}
                                            >
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showAddCourseModal && (<AddCourseModal 
                setShowAddCourseModal={setShowAddCourseModal} 
                addCourseErrMsg={addCourseErrMsg}
                setAddCourseErrMsg={setAddCourseErrMsg}
                addCourseSuccessMsg={addCourseSuccessMsg}
                setAddCourseSuccessMsg={setAddCourseSuccessMsg}
                refetch={refetchCourses}
                />)}
        </>
    );
}

export default CourseManagementPage;