import { useState } from "react";
import { useSelector } from "react-redux";
import { useUserByEmail } from "../../../services/user/useUserByEmail";
import { useCreateCourse } from "../../../services/course/useCreateCourse";
import { useUploadCourseImage } from "../../../services/courseService";

function AddCourseModal({ addCourseErrMsg, setAddCourseErrMsg, addCourseSuccessMsg, setAddCourseSuccessMsg, setShowAddCourseModal, refetch }) {
    const userEmail = useSelector(state => state.user.user.email);
    const { data } = useUserByEmail(userEmail);
    const create = useCreateCourse();

    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [imageUrlInput, setImageUrlInput] = useState("");
    const [levelInput, setLevelInput] = useState("");

    const handleTitleInputChange = (event) => setTitleInput(event.target.value);
    const handleDescriptionInputChange = (event) => setDescriptionInput(event.target.value);
    // const handleImageUrlInputChange = (event) => setImageUrlInput(event.target.value);

    const initialBtnState = "btn btn-outline-info";
    const selectedBtnState = "btn btn-info text-white";
    const [beginnerBtnState, setBeginnerBtnState] = useState(initialBtnState);
    const [intermediateBtnState, setIntermediateBtnState] = useState(initialBtnState);
    const [advancedBtnState, setAdvancedBtnState] = useState(initialBtnState);

    const levels = ["Beginner", "Intermediate", "Advanced"]

    const handleLevelClick = (level) => {
        setBeginnerBtnState(initialBtnState);
        setIntermediateBtnState(initialBtnState);
        setAdvancedBtnState(initialBtnState);

        switch (level) {
            case "Beginner": setBeginnerBtnState(selectedBtnState); break;
            case "Intermediate": setIntermediateBtnState(selectedBtnState); break;
            case "Advanced": setAdvancedBtnState(selectedBtnState); break;
            default: break;
        }

        setLevelInput(level);
    }
    
    const getLevelState = (level) => {
        switch (level) {
            case "Beginner": return beginnerBtnState;
            case "Intermediate": return intermediateBtnState;
            case "Advanced": return advancedBtnState;
        }
    }

    const uploadMutation = useUploadCourseImage();

    // const handleImageUpload = async (event) => {
    //     const file = event.target.files[0];
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append("file", file);

    //     uploadMutation.mutate(file, {
    //         onSuccess: (url) => {
    //         setImageUrlInput(url); // automatically set your course image URL
    //         },
    //         onError: () => {
    //         setAddCourseErrMsg("Image upload failed");
    //         },
    //     });
    // };

    const handleCourseSubmit = (event) => {
        event.preventDefault();

        const course = {
            title: titleInput,
            description: descriptionInput,
            level: levelInput,
            thumbnailUrl: imageUrlInput
        }

        create.mutate({ data, course }, {
            onSuccess: () => {
                setAddCourseErrMsg("");
                setAddCourseSuccessMsg("Course created successfully");

                setTitleInput("");
                setDescriptionInput("");
                setLevelInput("");
                setImageUrlInput("");

                setBeginnerBtnState(initialBtnState);
                setIntermediateBtnState(initialBtnState);
                setAdvancedBtnState(initialBtnState);

                refetch();
            },
            onError: (error) => {
                if (!error.response || error.code === "ERR_NETWORK") {
                    setAddCourseErrMsg("Server is not responding. Please try again later.");
                    return;
                }

                if (error.response.status === 400) {
                    setAddCourseErrMsg(`${error.response.message}`);
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
                        <h4 className="modal-title">Create course</h4>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowAddCourseModal(false)}>
                        </button>
                    </div>
                    <div className="modal-body">
                        {addCourseErrMsg && (
                            <div className="alert alert-danger mt-3">
                                {addCourseErrMsg}
                            </div>
                        )}

                        {addCourseSuccessMsg && (
                            <div className="alert alert-success mt-3">
                                {addCourseSuccessMsg}
                            </div>
                        )} 

                        <form onSubmit={handleCourseSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={titleInput}
                                    onChange={handleTitleInputChange}
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
                                    value={descriptionInput}
                                    onChange={handleDescriptionInputChange}
                                    required
                                ></textarea>
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Course Image</label>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    uploadMutation.mutate(file, {
                                        onSuccess: (url) => {
                                            setImageUrlInput(url);
                                        },
                                        onError: () => {
                                            setAddCourseErrMsg("Image upload failed");
                                        },
                                    });
                                    }}
                                />

                                {uploadMutation.isLoading && <p className="text-muted mt-2">Uploading...</p>}

                                {imageUrlInput && (
                                    <img
                                    src={imageUrlInput}
                                    alt="Course preview"
                                    className="img-fluid mt-2 rounded"
                                    style={{ maxHeight: "150px" }}
                                    />
                                )}
                            </div>
                            <h5 className="text-muted mx-2">Choose level</h5>
                            <div className="row g-2 mb-3">
                                {levels.map((level, index) => (
                                    <button 
                                        key={index}
                                        type="button"
                                        className={getLevelState(level)}
                                        onClick={() => handleLevelClick(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>

                            <div className="d-flex justify-content-center mb-3">
                                <button type="submit" className="btn btn-primary">
                                    Create course
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

export default AddCourseModal;