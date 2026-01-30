import { useGetPublishedCourses } from "../../services/courseService";
import CourseCard from "../../components/CourseCard";
import { useDispatch } from "react-redux";
import { addExploreCourse } from "../../redux/slices/courseSlice";
import { useEffect } from "react";

function ExploreCoursesPage() {
    const { data: publishedCourses = [] } = useGetPublishedCourses();
    const dispatch = useDispatch();

    console.log(publishedCourses);

    const context = ["explore"];

    useEffect(() => {
        if (publishedCourses.length > 0) {
            publishedCourses.forEach(course => {
                dispatch(addExploreCourse(course));
            });
        }
    }, [publishedCourses, dispatch]);

    return (
        <>
            <div className="container mt-4">
                <h4 className="fe-bold mb-3">Explore Courses</h4>
                <div className="row">
                    {publishedCourses.map((course, index) => (
                        <div 
                            className="col-6 col-md-4 col-lg-3 mb-4" 
                            key={index}
                        >
                            <CourseCard
                                imageUrl={course.imageUrl}
                                title={course.title}
                                description={course.description}
                                id={course.courseId}
                                context={context}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}

export default ExploreCoursesPage;