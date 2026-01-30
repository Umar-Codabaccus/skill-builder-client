import { Routes, Route } from "react-router-dom";
import RoleBasedRoute from "./RoleBasedRoute";
import AdminLayout from "../layouts/Admin/AdminLayout";

// pages
import Dashboard from "../pages/AdminPages/Dashboard";
import UserManagementPage from "../pages/AdminPages/UserManagementPage";
import CourseManagementPage from "../pages/AdminPages/CourseManagementPage";
import ManageCoursePage from "../pages/AdminPages/ManageCoursePage";

function AdminRoutes() {
    return (
       <Routes>
            <Route path="/admin"
                element={
                    <RoleBasedRoute allowedRoles={["Admin"]}>
                        <AdminLayout />
                    </RoleBasedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UserManagementPage />} />
                <Route path="courses"  element={<CourseManagementPage />} />
                <Route path="courses/:courseId" element={<ManageCoursePage />}/>
            </Route>
       </Routes>
    );
}

export default AdminRoutes;