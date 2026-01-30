import { Routes, Route } from "react-router-dom";
import RoleBasedRoute from "./RoleBasedRoute";
import LearnerLayout from "../layouts/Learner/LearnerLayout";

// Pages 
import HomePage from "../pages/LearnerPages/HomePage";
import MyCoursesPage from "../pages/LearnerPages/MyCoursesPage";
import ExploreCoursesPage from "../pages/LearnerPages/ExploreCoursesPage";
import QuizPage from "../pages/LearnerPages/QuizPage";
import CoursePage from "../pages/Courses/CoursePage";
import Overview from "../pages/Courses/Overview";
import Modules from "../pages/Courses/Modules";
import ModuleLayout from "../pages/Courses/ModuleLayout";
import ModulePage from "../pages/Courses/ModulePage";

function LearnerRoutes() {
    return (
        <Routes>
            <Route path="/learner"
                element={
                    <RoleBasedRoute allowedRoles={["Learner"]}>
                        <LearnerLayout />
                    </RoleBasedRoute>
            }>
                <Route index element={<HomePage />} />
                <Route path="my-courses" element={<MyCoursesPage />} />
                <Route path="explore-courses" element={<ExploreCoursesPage />} />
                <Route path="quizzes" element={<QuizPage />} />

                <Route path="my-courses/:courseId" element={<CoursePage />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="modules" element={<Modules />}/>
                </Route>

                <Route path="explore-courses/:courseId" element={<CoursePage />}>
                    <Route index element={<Overview />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="modules" element={<Modules />}/>
                </Route>

                <Route path="my-courses/:courseId/module" element={<ModuleLayout />}>
                       <Route path=":moduleId" element={<ModulePage />}/>
                </Route>
                
            </Route>
        </Routes>
    );
}

export default LearnerRoutes;