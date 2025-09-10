import { Course } from "@/src/types/backend-data";
import { useEffect, useState } from "react";
import { CourseService } from "../courses.service";

const courseService = new CourseService();

export function useFetchCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    function fetchCourses() {
        courseService.fetch().then((courses) => {
            setCourses(courses);
        });
    }
    useEffect(() => {
        fetchCourses();
    }, []);

    return courses;
}