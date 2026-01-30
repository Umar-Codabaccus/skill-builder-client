import { Outlet } from "react-router-dom";
// import { setModules } from "../../redux/slices/courseSlice";
// import { useDispatch } from "react-redux";
import CourseTab from "../../components/CourseTab";
import { useSelector } from "react-redux";
// import { useEffect } from "react";

function CoursePage() {
    // const dispatch = useDispatch();
    const course = useSelector(state => {
        const context = state.course.currentContext;

        console.log(context);
        if (context.includes("explore"))
            return state.course.exploreCourse;

        if (context.includes("enrolled") && context.includes("ongoing"))
            return state.course.ongoingCourse;

        if (context.includes("enrolled") && context.includes("completed"))
            return state.course.completedCourse;
        
        return null;
    })

    return (
        <>
            <div className="container mt-4">
                <h4 className="fw-bold mb-3">{course.title}</h4>
                <CourseTab courseId={course.courseId} context={course.context}/>
                <Outlet />
            </div>
        </>
    );
}

export default CoursePage;

    