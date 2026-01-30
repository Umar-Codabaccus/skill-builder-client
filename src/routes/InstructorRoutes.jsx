import { Routes, Route } from "react-router-dom";
import { RoleBasedRoute } from "./RoleBasedRoute";
import { InstructorLayout } from "../layouts/Instructor/InstructorLayout";

function InstructorRoutes() {
    return (
        <RoleBasedRoute allowedRoles={["instructor"]}>
            <InstructorLayout>
                <Routes>
                    
                </Routes>
            </InstructorLayout>
        </RoleBasedRoute>
    );
}