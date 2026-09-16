import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RegistrationPage from "../authentication/RegistrationPage";
import LoginPage from "../authentication/LoginPage";
import RoleBasedRoute from "./RoleBasedRoute";
import BrowseCourses from "../learner/BrowseCourses";
import MyLearning from "../learner/MyLearning";
import CourseLearn from "../learner/CourseLearn";
import InstructorCourses from "../instructor/InstructorCourses";
import CreateCourse from "../instructor/CreateCourse";
import EditCourse from "../instructor/EditCourse";
import ManageLessons from "../instructor/ManageLessons";

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>

                    <Route element={<RoleBasedRoute allowedRoles={["Learner"]} />}>
                        <Route path="/courses" element={<BrowseCourses />} />
                        <Route path="/learn" element={<MyLearning />} />
                        <Route path="/learn/:courseId" element={<CourseLearn />} />
                    </Route>

                    <Route element={<RoleBasedRoute allowedRoles={["Instructor"]} />}>
                        <Route path="/instructor/courses" element={<InstructorCourses />} />
                        <Route path="/instructor/course/create" element={<CreateCourse />} />
                        <Route path="/instructor/course/:courseId/edit" element={<EditCourse />} />
                        <Route path="/instructor/course/:courseId/lessons" element={<ManageLessons />} />
                    </Route>

                </Route>
            </Routes>
        </>
    );
}

export default AppRoutes;