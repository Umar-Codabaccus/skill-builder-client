import { apiFetch } from "./client";
import { BASE_URL } from "./auth";

export async function getPublishedCourses() {
    const response = await apiFetch("Learner/courses/published", {
        method: "GET"
    });

    return response;
}

export async function getEnrolledCourses() {
    const token = localStorage.getItem("token");

    const result = {
        isSuccess: null,
        error: null,
        status: null,
        courses: null,
    }

    try {
        const response = await fetch(`${BASE_URL}/Learner/courses/enrolled`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const error = await response.json();
            result.error = error.detail;
            result.isSuccess = false;
            return result;
        }

        const data = await response.json();

        console.log("ENROLLED COURSES");
        console.log(data);
        console.log();

        result.isSuccess = true;
        result.courses = [...data];

        return result;
    } catch (err) {
        console.log(err);
        result.error = "Failed to load courses, make sure you have a stable internet connection";
        result.isSuccess = false;
        return result;
    }

    const response = await apiFetch("Learner/courses/enrolled", {
        method: "GET"
    });

    return response;
}

export async function enrolInCourse(courseId) {
    const token = localStorage.getItem("token");

    const result = {
        isSuccess: null,
        error: null,
    }

    try {
        const response = await fetch(`${BASE_URL}/Learner/${courseId}/enrol`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ courseId: courseId })
        });

        if (!response.ok) {
            const error = await response.json();
            result.error = error.detail;
            result.isSuccess = false;
            return result;
        }

        const data = await response.json();

        console.log("ENROL RESPONSE DATA")
        console.log(data);
        console.log();

        result.isSuccess = true;
        return result;
    } catch (err) {
        result.error = "Cannot enrol into course, make sure you have a stable internet connection.";
        result.isSuccess = false;
        return result;
    }

    const response = await apiFetch(`Learner/${courseId}/enrol`, {
        method: "POST",
        body: JSON.stringify({ courseId })
    });

    return response;
}

export async function startLesson(lessonId) {
    const token = localStorage.getItem("token");

    const result = {
        error: null,
        isSuccess: null,
    }

    try {
        const response = await fetch(`${BASE_URL}/Learner/${lessonId}/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ lessonId })
        });

        const data = await response.json();

        if (!response.ok) {
            result.isSuccess = false;
            result.error = data.detail;
            return result;
        }

        result.isSuccess = true;

        return result;
    } catch (err) {
        console.log(err);
        result.isSuccess = false;
        result.error = "Unable to start lesson. Check internet connection or login again."
        return result;
    }
}

export async function completeLesson(lessonId) {
    const token = localStorage.getItem("token");

    const result = {
        error: null,
        isSuccess: null,
        status: null
    }

    try {
        const response = await fetch(`${BASE_URL}/Learner/${lessonId}/complete`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ lessonId })
        });

        if (!response.ok) {
            const error = await response.json();
            result.isSuccess = false;
            result.error = error.detail;
            result.status = error.status;
            return result;
        }

        result.isSuccess = true;
        return result;
    } catch (err) {
        console.log(err);
        result.isSuccess = false;
        result.error = "Unable to mark lesson as complete. Check internet connection or login again."
        return result;
    }
}

export async function getProgress(courseId) {
    const token = localStorage.getItem("token");

    const result = {
        error: null,
        isSuccess: null,
        lessons: null,
        status: null,
        percentageCompleted: null,
    }

    try {
        const response = await fetch(`${BASE_URL}/Learner/${courseId}/progress`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        console.log(response);

        if (!response.ok) {
            const error = await response.json();
            result.isSuccess = false;
            result.error = error.detail;
            result.status = error.status;
            result.lessons = [];
            result.percentageCompleted = 0;
            return result;
        }

        const data = await response.json();

        result.lessons = [...data.lessons];
        result.percentageCompleted = data.percentageCompleted;

        result.isSuccess = true;

        return result;
    } catch (err) {
        console.log(err);
        result.isSuccess = false;
        result.error = "Failed to load page, make sure you have a stable internet connection";
        return result;
    }
}