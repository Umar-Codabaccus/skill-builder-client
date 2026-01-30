import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAutoCrop } from "../../hooks/useAutoCrop";
import { useNavigate } from "react-router-dom";
// import { setModules } from "../../redux/slices/courseSlice";
import { useEnroll } from "../../services/courseService";
import { setOngoingCourse } from "../../redux/slices/courseSlice";

function Overview() {
    const course = useSelector(state => {
        const context = state.course.currentContext;

        if (context.includes("explore"))
            return state.course.exploreCourse;

        if (context.includes("enrolled") && context.includes("ongoing"))
            return state.course.ongoingCourse;

        if (context.includes("enrolled") && context.includes("completed"))
            return state.course.completedCourse;
        
        return null;
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const enroll = useEnroll();
    
    const handleClick = () => {
        if (!course.modules || course.modules.length === 0) return;

        console.log(course.context);
        if (course.context.includes("explore"))
        {
            enroll.mutate(course.courseId, {
                onSuccess: (data) => {
                    alert("Enrollment successfull")
                    console.log(data);
                    if (data.status === "Ongoing"){
                        const ongoingCourse = {
                            courseId: data.courseId,
                            title: data.title,
                            description: data.description,
                            imageUrl: data.imageUrl,
                            isEnrolled: true,
                            isCompleted: false,
                            modules: data.modules
                        }
                    
                    console.log(ongoingCourse)};
                    dispatch(setOngoingCourse(ongoingCourse));
                },
                pnError: (error) => {
                    alert(`Enrollment failed: ${error.response.message}`);
                }
            });
        }

        const firstModule = course.modules.find(m => m.order === 1);
        navigate(`/learner/my-courses/${course.courseId}/module/${firstModule.moduleId}`);
    }

    const buttonText = () => {
        if (course.isCompleted) {
            return "View";
        }

        if (course.isEnrolled) {
            return "Continue";
        }

        return "Enroll";
    }
    
    const { croppedImage, cropToFit } = useAutoCrop(16, 9);

    useEffect(() => {
        if (course.imageUrl) {
            cropToFit(course.imageUrl);
        }
    }, [course.imageUrl]);

    return (
        <>
            <div className="card mb-3 m-3" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={croppedImage || course.imageUrl} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">{course.description}</p>

                            <button className="btn btn-primary" onClick={handleClick}>
                                {buttonText()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Overview;