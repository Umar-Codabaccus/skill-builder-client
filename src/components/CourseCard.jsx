import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setExploreCourse, setOngoingCourse, setCompletedCourse, addCourseModulesToExploreCourses } from "../redux/slices/courseSlice";
import useBreakpoint from "../hooks/useBreakpoint";
import { useAutoCrop } from "../hooks/useAutoCrop";
import { useEffect } from "react";
import { useGetModules } from "../services/module/useGetModules";

function CourseCard({imageUrl, title, description, id, context}) {
    const { croppedImage, cropToFit } = useAutoCrop(16, 9);
    const { data: modules } = useGetModules(id);

    console.log(`${id}: ${title}`);
    console.log(modules);

    useEffect(() => {
        if (imageUrl) {
            cropToFit(imageUrl)
        }
    }, [imageUrl]);

    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();
    const bs = ["xs", "sm", "md", "lg", "xl"];

    const handleClick = () => {
        var m = []

        modules.forEach(module => {
            m.push({
                moduleId: module.id,
                title: module.moduleDto.title,
                description: module.moduleDto.description,
                videoUrl: module.moduleDto.videoUrl,
                order: module.order
            })
        });

        const course = {
            courseId: id,
            title: title,
            description: description,
            imageUrl: imageUrl, 
            modules: m
        }

        if (context.includes("explore")) {
            dispatch(setExploreCourse(course));
            dispatch(addCourseModulesToExploreCourses({
                courseId: course.courseId,
                modules: course.modules
            }));
        }

        if (context.includes("enrolled") && context.includes("ongoing"))
            dispatch(setOngoingCourse(course));

        if (context.includes("enrolled") && context.includes("completed"))
            dispatch(setCompletedCourse(course));
    }

    const titleLen = () => {
        if (bs.includes(breakpoint)) {
            if (title.length > 20) {
                return title.slice(0, 20).concat("...");
            }
        }

        return title;

    }

    const descLen = () => {
        if (bs.includes(breakpoint)) {
            if (description.length > 40) {
                return description.slice(0, 40).concat("...");
            }
        }

        return description;
    }

    const handleRoute = () => {
        if (context.includes("explore")){
            return "explore-courses";
        }

        return "my-courses";
    }
    return (
        <>
            <div className="card">
                <img 
                    src={croppedImage || imageUrl} 
                    alt={title}
                    className="card-img-top" />
                <div className="card-body">
                    <div className="card-title">{titleLen()}</div>
                    <p className="card-text">{descLen()}</p>
                    {/* <button onClick={handleClick} className="btn">
                        <Link to={`/learner/${handleRoute()}/${id}`} className="btn btn-primary">
                            Go to course
                        </Link>
                    </button> */}
                    <Link
                        to={`/learner/${handleRoute()}/${id}`}
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                        Go to course
                    </Link>
                </div>
            </div>
        </>
    );
}

export default CourseCard;