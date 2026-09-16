import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import InputForm from "../authentication/InputForm";
import { updateCourse, getMyCourses } from "../api/instructor";

function EditCourse() {
    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim() && !description.trim()) {
            setErrorMsg("Enter a title or description to update.");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        const result = await updateCourse(courseId, title, description);;

        if (!result.isSuccess) {
            if (result.status === 401 || result.status === 403) {
                navigate("/login");
            }

            if (err.status === 400)
                setErrorMsg("Please check the course details and try again.");
            else
                setErrorMsg("Unable to update the course.");
        }

        setLoading(false);
        navigate("/instructor/courses");
    };

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div
                className="card shadow-lg border-0"
                style={{ maxWidth: "600px", width: "100%" }}>
                <div className="card-body p-4">
                    <h3 className="text-center fw-bold mb-4 text-primary">
                        Edit Course
                    </h3>

                    {errorMsg && (
                        <div className="alert alert-danger mt-3">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <InputForm
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Course title"
                            label="Title"
                            htmlFor="title"
                            value={title}
                            onChange={handleTitleChange}
                        />

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows="4"
                                placeholder="Course description"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>

                        <div className="d-grid mb-3">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={loading}
                            >
                                <span>Save Changes</span>

                                {loading && (
                                    <div
                                        className="spinner-border spinner-border-sm ms-2"
                                        role="status"
                                        aria-hidden="true"
                                    >
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCourse;