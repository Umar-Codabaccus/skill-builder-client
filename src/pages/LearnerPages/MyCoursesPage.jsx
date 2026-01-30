import CourseCard from "../../components/CourseCard";
import { useSelector } from "react-redux";
import { useGetMyCourses } from "../../services/courseService";
import { useDispatch } from "react-redux";
import { setMyCourses } from "../../redux/slices/courseSlice";
import { useEffect } from "react";

function MyCoursesPage() {
    const dispatch = useDispatch();
    const { data: myCourses } = useGetMyCourses();

    useEffect(() => {
        if (myCourses) {
            dispatch(setMyCourses(myCourses));
        }
    }, [myCourses, dispatch]);

    const ongoingCourses = useSelector(state => state.course.ongoingCourses);
    const completedCourses = useSelector(state => state.course.completedCourses);

    return (
        <>
            <div className="container mt-4">
                <h4 className="fw-bold mb-3">Ongoing</h4>
                <div className="row">
                    {ongoingCourses.map((course, index) => (
                        <div 
                            className="col-6 col-md-4 col-lg-3 mb-4" 
                            key={index}
                        >
                            <CourseCard
                                imageUrl={course.thumbnailUrl}
                                title={course.title}
                                description={course.description}
                                id={course.courseId}
                                context={["enrolled", "ongoing"]}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mt-4">
                <h4 className="fw-bold mb-3">Completed</h4>
                <div className="row">
                    {completedCourses.map((course, index) => (
                        <div 
                            className="col-6 col-md-4 col-lg-3 mb-4" 
                            key={index}
                        >
                            <CourseCard
                                imageUrl={course.thumbnailUrl}
                                title={course.title}
                                description={course.description}
                                id={course.courseId}
                                context={["enrolled", "completed"]}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MyCoursesPage;