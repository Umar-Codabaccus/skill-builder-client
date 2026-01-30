import { Link } from "react-router-dom";

function HomeCourseCard({title, image, progress = 40}) {
    return (
      <>
        <Link to="/learner/my-courses" className="text-decoration-none">
            <div className="card mb-3" style={{maxWidth: "100%"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img 
                            src={image} 
                            className="img-fluid rounded-start" 
                            alt="..." 
                            style={{objectFit: "cover", width: "100%", height: "100%"}}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <div  className="progress" role="progressbar">
                                <div className="progress-bar" style={{width: `${progress}%`}}>
                                    {progress}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
      </>  
    );
}

export default HomeCourseCard;