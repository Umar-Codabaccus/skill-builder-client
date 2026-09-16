import { Routes, Route } from "react-router-dom";
import RoleBasedRoute from "./RoleBasedRoute";

import BrowseCourses from "../learner/BrowseCourses";
import MyLearning from "../learner/MyLearning";
import CourseLearn from "../learner/CourseLearn";

function LearnerRoutes() {
    return (
        <Routes>
            <Route element={<RoleBasedRoute allowedRoles={["Learner"]} />}>
                <Route path="/courses" element={<BrowseCourses />} />
                <Route path="/learn" element={<MyLearning />} />
                <Route path="/learn/:courseId" element={<CourseLearn />} />
            </Route>
        </Routes>
    );
}

export default LearnerRoutes;