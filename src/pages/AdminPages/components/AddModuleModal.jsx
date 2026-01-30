import { useState } from "react";
import { useAddModule } from "../../../services/courseService";

function AddModuleModal({ courseId, setShowAddModuleModal, successMsg, setSuccessMsg, refetch }) {
    const [moduleForm, setModuleForm] = useState({
        title: "",
        description: "",
        videoUrl: ""
    });

    const handleModuleChange = (event) => {
        const { name, value } = event.target;
        setModuleForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addModule = useAddModule();
    const handleModuleSubmit = (event) => {
        event.preventDefault();

        const moduleInfo = {
            courseId: courseId,
            title: moduleForm.title,
            description: moduleForm.description,
            videoUrl: moduleForm.videoUrl
        }

        addModule.mutate(moduleInfo, {
            onSuccess: () => {
                setSuccessMsg("Module added successfully.");
                setModuleForm({
                    title: "",
                    description: "",
                    videoUrl: ""
                })

                refetch();
            },
            onError: (error) => {
                if (!error.response || error.code === "ERR_NETWORK") {
                    alert("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 400 || error.response.status === 404){
                    alert(`${error.response.message}`);
                    return;
                }
            }
        })
    }

    return (
        <>
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Create Module</h4>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowAddModuleModal(false)}>     
                            </button>
                        </div>
                        <div className="modal-body">

                            {successMsg && (
                                <div className="alert alert-success mt-3">
                                    {successMsg}
                                </div>
                            )}

                            <form onSubmit={handleModuleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="Title"
                                        value={moduleForm.title}
                                        onChange={handleModuleChange}
                                        required
                                    />
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Description"
                                        id="description"
                                        name="description"
                                        style={{ height: "120px" }}   // important for floating textarea
                                        value={moduleForm.description}
                                        onChange={handleModuleChange}
                                        required
                                    ></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="videoUrl"
                                        name="videoUrl"
                                        placeholder="Video Url"
                                        value={moduleForm.videoUrl}
                                        onChange={handleModuleChange}
                                        required
                                    />
                                    <label htmlFor="videoUrl">Video Url</label>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <button type="submit" className="btn btn-primary">
                                        Create module
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddModuleModal;