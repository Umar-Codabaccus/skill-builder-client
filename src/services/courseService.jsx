import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";

import { useUserByEmail } from "./user/useUserByEmail";

function useGetPublishedCourses() {
    const userEmail = useSelector(state => state.user.user.email);
    const { data: user } = useUserByEmail(userEmail);

    return useQuery({
        queryKey: ["publishedCourses"],
        enabled: !!user?.id,
        queryFn: async () => {
            const response = await api.get(`/Course/published-courses/${user.id}`);
            return response.data;
        }
    })
}

function useUploadCourseImage() {
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/Course/course-thumbnail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.imageUrl; // returns the URL string
    },
  });
}

function useAddModule() {
    return useMutation({
        mutationFn: async (moduleInfo) => {
            console.log(moduleInfo);
            const moduleDto = {
                title: moduleInfo.title,
                description: moduleInfo.description,
                videoUrl: moduleInfo.videoUrl
            }
            const response = await api.post(`/Module/${moduleInfo.courseId}/create`, moduleDto);
            return response.data;
        }
    })
}

function usePublishCourse() {
    return useMutation({
        mutationFn: async (courseId) => {
            const response = await api.put(`/Course/publish/${courseId}`);
        }
    });
}

function useEnroll() {
    const userEmail = useSelector(state => state.user.user.email);
    const { data: user } = useUserByEmail(userEmail);

    return useMutation({
        mutationFn: async (id) => {
            const request = {
                userId: user.id,
                courseId: id, 
            }
            const response = await api.post("/Enroll/enroll", request);
            return response.data;
        }
    });
}

function useGetMyCourses() {
    const userEmail = useSelector(state => state.user.user.email);
    const { data: user } = useUserByEmail(userEmail);

    return useQuery({
        queryKey: ["my-courses"],
        queryFn: async () => {
            const response = await api.get(`Enroll/enrolled-courses/${user.id}`)
            return response.data;
        }
    });
}

export { useGetPublishedCourses, useUploadCourseImage, useAddModule, usePublishCourse, useEnroll, useGetMyCourses }