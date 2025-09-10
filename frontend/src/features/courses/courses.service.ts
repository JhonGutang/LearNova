import axiosInstance from "@/lib/axios";
import { Course } from "@/src/types/backend-data";

interface CourseServiceInterface {
    fetch(): Promise<Course[]>;
}


export class CourseService implements CourseServiceInterface {
    async fetch(): Promise<Course[]> {
        const response = await axiosInstance.get('/courses');
        return response.data;
    }
}