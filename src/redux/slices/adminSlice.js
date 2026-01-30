import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course: {
        id: "",
        title: "",
        description: "",
        level: "",
        thumbnailUrl: "",
        status: "",
        userId: "",
    },
    courses: []
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setCourseManage: (state, action) => {
            if (action.payload) state.course = action.payload;
        },
        setStatus: (state, action) => {
            state.course.status = action.payload;
        }
    }
});

export const { setCourseManage, setStatus } = adminSlice.actions;
export default adminSlice.reducer;