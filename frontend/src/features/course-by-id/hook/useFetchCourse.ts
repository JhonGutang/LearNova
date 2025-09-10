import { useState, useEffect } from "react";
import { CourseByIdService } from "../course-by-id.service";
import { AxiosResponse } from "axios";
import { Course } from "@/src/types/backend-data";

const courseByIdService = new CourseByIdService();

export function useFetchCourse(courseId: number | null) {
    const [course, setCourse] = useState<Course | null>();

    const handleFetchCourseById = (courseId: number) => {
        courseByIdService.fetch(courseId)
        .then((response: AxiosResponse) => {
            setCourse(response.data);
        })
        .catch((error) => {
            console.error("Failed to fetch course:", error);
        });
    }

    useEffect(() => {
        if(!courseId) return
        handleFetchCourseById(courseId);
    }, [courseId]);

    return {
        course,
        setCourse,
        handleFetchCourseById,
    };
}
