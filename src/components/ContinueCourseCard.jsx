import { Link } from "react-router-dom";

function ContinueCourseCard({title, image, progress = 0}) {
    return (
        <>
            <Link 
                to="/learner/my-courses"
                className="text-decoration-none"
                style={{
                    color: "inherit"
                }}>
                    <div
                        className="card text-bg-dark position-relative border-0 overflow-hidden"
                        style={{
                            height: "220px",
                            cursor: "pointer",
                            borderRadius: "15px"
                        }}>
                            <img 
                                src={image} 
                                alt={image}
                                className="card-img"
                                style={{
                                    objectFit: "cover",
                                    height: "100%"
                                }} />
                            <h5 className="card-title fw-bold">{title}</h5>
                            <div className="progress mt-1" style={{ height: "6px"}}>
                                <div 
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{
                                        width: `${progress}%`
                                    }}></div>
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                                <span className="fw-semibold">
                                    Continue &rarr;
                                </span>
                            </div>
                    </div>
            </Link>
        </>
    );
}

export default ContinueCourseCard;