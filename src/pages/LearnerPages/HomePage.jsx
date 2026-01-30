// import ContinueCourseCard from "../../components/ContinueCourseCard";
import HomeCourseCard from "../../components/HomeCourseCard";
import pythonImage from "../../assets/pythoncode.jpg";

function HomePage() {

    return (
        <>
            {/* <div className="container py-4">
                <h4 className="fw-bold mb-3">Continue Learning</h4>

                <ContinueCourseCard
                    title="Introduction to Python Programming"
                    image="../../assets/pythoncode.jpg"
                    progress={45}
                />
            </div> */}
            <div className="container py-4">
                <h4 className="fw-bold mb-3">Continue Learning</h4>

                <HomeCourseCard 
                    title="Introduction to Python Programming" 
                    image={pythonImage}
                    progress={56}/>
            </div>
        </>
    );
}

export default HomePage;