import { createSlice } from "@reduxjs/toolkit";
import java from "../../assets/java.jpg";
import python from "../../assets/pythoncode.jpg";

const initialState = {
    currentContext: [],
    exploreCourse: {
        courseId: null,
        title: null,
        description: null,
        imageUrl: null,
        isEnrolled: false,
        isCompleted: false,
        context: ["explore"], // three context: explore, enrolled, completed
        modules: []
    },
    module: {
        moduleId: null,
        title: null,
        description: null,
        videoUrl: null,
        order: null
    },
    exploreCourses: [],
    exploreModules: [],
    ongoingCourse: {
        courseId: null,
        title: null,
        description: null,
        imageUrl: null,
        isEnrolled: true,
        isCompleted: false,
        context: ["enrolled", "ongoing"],
        modules: []
    },
    ongoingCourses: [],
    ongoingModules: [],
    completedCourse: {
        courseId: null,
        title: null,
        description: null,
        imageUrl: null,
        isEnrolled: true,
        isCompleted: true,
        context: ["enrolled", "completed"],
        modules: []
    },
    completedCourses: [],
    modules: []
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setExploreCourse: (state, action) => {
            const course = action.payload;
            state.exploreCourse.courseId = course.courseId;
            state.exploreCourse.title = course.title;
            state.exploreCourse.description = course.description;
            state.exploreCourse.imageUrl = course.imageUrl;

            const modules = course.modules;
            state.exploreCourse.modules = modules;
            state.exploreModules = modules;

            state.currentContext = ["explore"];
        },
        setOngoingCourse: (state, action) => {
            const course = action.payload;
            state.ongoingCourse.courseId = course.courseId,
            state.ongoingCourse.title = course.title;
            state.ongoingCourse.description = course.description;
            state.ongoingCourse.imageUrl = course.imageUrl;

            const modules = course.modules;
            state.ongoingCourse.modules = modules;
            state.ongoingModules = modules;

            state.currentContext = ["enrolled", "ongoing"];
        },
        setCompletedCourse: (state, action) => {
            const course = action.payload;
            state.completedCourse.courseId = course.courseId,
            state.completedCourse.title = course.title;
            state.completedCourse.description = course.description;
            state.completedCourse.imageUrl = course.imageUrl;

            const modules = course.modules;
            state.completedCourse.modules = modules;

            state.currentContext = ["enrolled", "completed"];
        },
        addExploreCourse: (state, action) => {
            state.exploreCourses.push(action.payload);
        },
        addCourseModulesToExploreCourses: (state, action) => {
            const courseId = action.payload.courseId;
            const modules = action.payload.modules;

            const course = state.exploreCourses.find(
                c => c.courseId === courseId
            );

            if (course) {
                course.modules = modules;
            }
        },
        setMyCourses: (state, action) => {
            const courses = action.payload;

            state.ongoingCourses = courses.filter(c => c.status === "Ongoing");
            state.completedCourses = courses.filter(c => c.status === "Completed");
        },
    }
});

export const { setExploreCourse, setOngoingCourse, setCompletedCourse, addExploreCourse, addCourseModulesToExploreCourses, setMyCourses } = courseSlice.actions;
export default courseSlice.reducer;