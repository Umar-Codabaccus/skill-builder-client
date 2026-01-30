import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recentViewCourse: {
        courseId: null,
        title: null,
        description: null,
        level: null,
        imageUrl: null,
        status: null
    },
    publishedCourses: []
}

const publishedCoursesSlice = createSlice({
    name: "publishedCourses",
    initialState,
    reducers: {
        setPublishedCourse: (state, action) => {
            state.publishedCourses.push(action.payload);
        }
    }
});

export const { setPubslihedCourse } = publishedCoursesSlice.actions;
export default publishedCoursesSlice.reducer;