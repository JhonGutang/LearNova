import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

interface MainModuleServiceInterface {
    getSpecificModule(moduleId: number): Promise<AxiosResponse>
}


export class MainModuleService implements MainModuleServiceInterface {
    async getSpecificModule(moduleId: number): Promise<AxiosResponse> {
        const module = await axiosInstance.get(`/modules/${moduleId}`)
        return module;
    }
}