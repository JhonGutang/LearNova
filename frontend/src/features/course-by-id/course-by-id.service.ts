import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

interface CourseByIdServiceInterface {
    fetch(courseId: number): Promise<AxiosResponse>
}


export class CourseByIdService implements CourseByIdServiceInterface {
    async fetch(courseId: number): Promise<AxiosResponse> {
        const module = await axiosInstance.get(`/courses/${courseId}`)
        return module;
    }
}