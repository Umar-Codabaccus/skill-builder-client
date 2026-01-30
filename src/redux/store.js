import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";
import adminReducer from "./slices/adminSlice";
import publishedCoursesReducer from "./slices/publishedCoursesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        course: courseReducer,
        admin: adminReducer,
        publishedCourses: publishedCoursesReducer,
    }
});