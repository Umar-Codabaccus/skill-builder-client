import { useSelector } from "react-redux";
import ModuleAccordionItem from "./ModuleAccordionItem";

function ModuleAccordion() {
    const modules = useSelector(state => {
        const context = state.course.currentContext;

        if (context.includes("explore"))
        {
            return state.course.exploreCourse.modules;
        }

        if (context.includes("enrolled") && context.includes("ongoing"))
        {
            return state.course.ongoingCourse.modules;
        }

        if (context.includes("enrolled") && context.includes("completed"))
        {
            return state.course.completedCourse.modules;
        }
    });

    if (!modules) return <h1>Loading...</h1>

    console.log(modules);
    
    return (
        <>
            <div className="accordion" id="moduleAccordion">
                {modules
                ?.slice() // avoid mutating original array
                .sort((a, b) => a.order - b.order)
                .map((module, index) => (
                        <ModuleAccordionItem 
                            key={index} 
                            id={module.moduleId} 
                            title={module.title} 
                            description={module.description}
                            />
                    ))}
            </div>
        </>
    );
}

export default ModuleAccordion;