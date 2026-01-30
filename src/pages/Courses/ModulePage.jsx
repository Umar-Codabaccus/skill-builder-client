import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBreakpoint from "../../hooks/useBreakpoint";

function toEmbedUrl(url) {
  const reg = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const match = url.match(reg);

  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return url; // already embed or not youtube
}

function ModulePage() {
    const { courseId, moduleId } = useParams();
    const breakpoint = useBreakpoint();

    const course = useSelector(state => {
        const context = state.course.currentContext;

        if (context.includes("explore"))
            return state.course.exploreCourse;

        if (context.includes("enrolled") && context.includes("ongoing"))
            return state.course.ongoingCourse;

        if (context.includes("enrolled") && context.includes("completed"))
            return state.course.completedCourse;
        
        return null;
    });

    const module = course?.modules?.find(m => m.moduleId === moduleId);
    
    if (!course || !module) {
        return <div className="container mt-4">Loading module...</div>;
    }

    const handleMargin = () => {
        const bs = ["xs", "sm"];

        if (bs.includes(breakpoint)) {
            return true;
        }

        return false;
    }

    return (
        <>
            <div className={handleMargin() ? "container-fluid border rounded mt-2" : "container-fluid border rounded"}>
                <h3 className="fw-bold">{course.title}</h3>
                <h4 className="fw-normal">{module.title}</h4>

                {/* Video Player */}
                <div className="ratio ratio-16x9 mb-3">
                    <iframe
                        src={toEmbedUrl(module.videoUrl)}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                <p className="fw-lighter">{module.description}</p>
                <button className="btn btn-success mb-2">Mark as complete</button>
            </div>
        </>
    );
}

export default ModulePage;