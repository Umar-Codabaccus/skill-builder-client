import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

function ModuleNav() {
    const { courseId, moduleId } = useParams();

    const modules = useSelector(state => {
        const context = state.course.currentContext;

        if (context.includes("explore"))
            return state.course.exploreCourse.modules;

        if (context.includes("enrolled") && context.includes("ongoing"))
            return state.course.ongoingCourse.modules;

        if (context.includes("enrolled") && context.includes("completed"))
            return state.course.completedCourse.modules;
        
        return null;
    });

    const handleActiveModule = (id) => {
        if (moduleId == id) {
            return true;
        }
        return false;
    }

    return (
        <>
            <div className="container-fluid">
                <ul className="nav nav-pills nav-fill flex-columm border border-primary-subtle rounded">
                    {modules?.slice() // avoid mutating original array
                    .sort((a, b) => a.order - b.order)
                    .map((module, index) => (
                        <li className="nav-item">
                            <NavLink
                                key={index}
                                to={`/learner/my-courses/${courseId}/module/${module.moduleId}`}
                                className={handleActiveModule(module.moduleId) ? `nav-link text-white` : `nav-link text-primary`}>
                                {module.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ModuleNav;