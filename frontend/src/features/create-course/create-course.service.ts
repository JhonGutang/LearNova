import axiosInstance from "@/lib/axios";
import { CreateCourseFormData } from "@/src/types/backend-data";
import type { AxiosResponse } from "axios";

interface CreateCourseServiceInterface {
    create(course: CreateCourseFormData): Promise<AxiosResponse>;
}

export class CreateCourseService implements CreateCourseServiceInterface {
    async create(course: CreateCourseFormData): Promise<AxiosResponse> {
        const newCourse = await axiosInstance.post('/create-course', course);
        return newCourse;
    }
}