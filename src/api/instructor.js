import { apiFetch } from "./client";
import { BASE_URL } from "./auth";

export async function getCourse(courseId) {
    const token = localStorage.getItem("token");

    const result = {
        error: null,
        isSuccess: null,
        status: null,
        course: null
    }

    try {
        const response = await fetch(`${BASE_URL}/Instructor/course/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        const data = await response.json();

        console.log(data);

        if (data.title) {
            result.error = data.error;
            result.status = data.status;
            result.isSuccess = false;
            return result;
        }

        result.isSuccess = true;
        result.course = data.value;

        return result;
    } catch (err) {
        result.error = err;
        result.isSuccess = false;
        return result;
    }
}

export async function createCourse(title, description) {
    const token = localStorage.getItem("token");

    const result = {
        isSuccess: null,
        error: null,
        status: null
    }

    try {
        const apiResponse = await fetch(`${BASE_URL}/Instructor/course/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        const data = await apiResponse.json();

        if (data.title) {
            result.error = data.detail;
            result.status = data.status;
            return result;
        }

        result.isSuccess = true;
        return result;
    } catch (err) {
        result.isSuccess = false;
        result.error = err;
        return result;
    }
}

export async function updateCourse(courseId, title, description) {
    const token = localStorage.getItem("token");

    const result = {
        isSuccess: null,
        error: null,
        status: null
    }

    try {
        const response = await apiFetch(`Instructor/${courseId}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ courseId: courseId, title: title, description: description })
        });

        if (!response.ok) {
            result.status = response.status;
            const error = await response.json();
            result.error = error;
            return result;
        }

        const data = await response.json();

        if (data.title) {
            result.error = data.detail;
            result.status = data.status;
            return result;
        }

        result.isSuccess = true;
        return result;

    } catch (err) {
        result.isSuccess = false;
        result.error = err;
        return result;
    }

    const response = await apiFetch(`Instructor/${courseId}/update`, {
        method: "PUT",
        body: JSON.stringify({ courseId, title, description })
    });
 
    return response;
}

export async function archiveCourse(courseId) {
    const response = await apiFetch(`Instructor/${courseId}/archive`, {
        method: "PUT",
        body: JSON.stringify({ courseId })
    });
 
    return response;
}
 
export async function publishCourse(courseId) {
    const token = localStorage.getItem("token");

    const result = {
        isSuccess: null,
        error: null,
        status: null,
    }

    try {
        const response = await fetch(`${BASE_URL}/Instructor/${courseId}/publish`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ courseId })
        });

        if (!response.ok) {
            const error = await response.json();
            result.error = error.detail;
            result.status = error.status;
            result.isSuccess = false;
            return result;
        }

        result.isSuccess = true;
        return result;
    } catch (err) {
        console.log(err);
        result.error = "Unable to publish course, make sure you have a stable internet connection";
        result.isSuccess = false;
        return result;
    }
}
 
export async function getMyCourses() {
    const token = localStorage.getItem("token");

    const result = {
        isSuccess: null,
        error: null,
        status: null,
        courses: [],
    }

    try {
        const apiResponse = await fetch(`${BASE_URL}/Instructor/courses/mine`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!apiResponse.ok) {
            const error = await apiResponse.json();

            if (error.status === 404) {
                result.isSuccess = false;
                result.error = error.detail;
                result.status = 404;
            }
        }

        const data = await apiResponse.json();
        const courses = data.myCourses;

        const myCourses = [];
        for (let course of courses) {
            myCourses.push({
                courseId: course.courseId,
                courseTitle: course.title,
                courseDescription: course.description,
                courseStatus: course.status
            });
        }

        result.isSuccess = true;
        result.courses = [...myCourses];
        return result;
    } catch {
        result.error = "An error occured while fetching courses."
        result.isSuccess = false;
        return result;
    }
}

export async function getLessonsByCourse(courseId) {
    const response = await apiFetch(`Instructor/${courseId}/lessons`, {
        method: "GET"
    });

    return response;
}
 
export async function createLesson(courseId, title, url) {
    const token = localStorage.getItem("token");

    const result = {
        error: null,
        isSuccess: null,
        status: null,
        titleError: null,
        urlError: null
    }

    try {
        const response = await fetch(`${BASE_URL}/Instructor/${courseId}/lesson/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ courseId, title, url })
        });

        if (response.status === 400) {
            const error = await response.json();

            if ("title" in error) {
                result.titleError = [...error.title];
            }

            if ("url" in error) {
                result.urlError = [...error.url];
            }

            result.isSuccess = false;
            return result;
        }

        const data = await response.json();

        result.isSuccess = true;
        return result;

    } catch (err) {
        console.log(err);
        result.error = "Cannot create lesson, please make sure to have a stable internet connection."
        result.isSuccess = false;
        return result;
    }
}
 
export async function updateLesson(courseId, lessonId, title, url) {
    const response = await apiFetch(`Instructor/${courseId}/${lessonId}/update`, {
        method: "PUT",
        body: JSON.stringify({ lessonId, title, url })
    });
 
    return response;
}
 
export async function deleteLesson(courseId, lessonId) {
    const response = await apiFetch(`Instructor/${courseId}/${lessonId}/delete`, {
        method: "DELETE",
        body: JSON.stringify({ lessonId, courseId })
    });
 
    return response;
}