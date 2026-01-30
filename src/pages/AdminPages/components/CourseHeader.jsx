import { usePublishCourse } from "../../../services/courseService";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../redux/slices/adminSlice";

function CourseHeader({ id, title, status}) {
    const publish = usePublishCourse();
    const dispatch = useDispatch();

    const isPublished = () => {
        if (status === "Draft") {
            return "badge bg-secondary";
        }

        return "badge bg-success";
    }

    const publishBtnStyle = () => {
        if (status === "Draft") {
            return "btn btn-success";
        }

        return "btn btn-secondary";
    }
    
    const handlePublish = () => {
        if (status === "Published"){
            alert("Course is already published");
            return;
        }
        
        publish.mutate(id, {
            onSuccess: () => {
                alert("Course published successfully");
                dispatch(setStatus("Published"));
                return;
            },
            onError: (error) => {
                alert(error.response.message);
                return;
            }
        });
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                    <h3 className="fw-bold mb-1">
                        {title}
                    </h3>
                    <span className={isPublished()}>
                        {status}
                    </span>
                </div>

                <button className={publishBtnStyle()} onClick={handlePublish}>
                    <i className="bi bi-cloud-upload me-1"></i>
                </button>
            </div>

            <hr />
        </>
    );
}

export default CourseHeader;