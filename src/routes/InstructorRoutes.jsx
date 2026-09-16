import { Routes, Route } from "react-router-dom";
import RoleBasedRoute from "./RoleBasedRoute";
import CreateCourse from "../instructor/CreateCourse";
import EditCourse from "../instructor/EditCourse";
import InstructorCourses from "../instructor/InstructorCourses";

function InstructorRoutes() {
    return (
        <RoleBasedRoute allowedRoles={["Instructor"]}>
            <Routes>
                <Route path="/instructor/courses" element={<InstructorCourses />} />
                <Route path="/instructor/course/create" element={<CreateCourse />} />
                <Route path="/instructor/course/edit" element={<EditCourse />} />
            </Routes>
        </RoleBasedRoute>
    );
}

export default InstructorRoutes;