import axiosInstance from "@/lib/axios";
import { CreateModuleFormData } from "@/src/types/backend-data";
import type { AxiosResponse } from "axios";

interface CreateModuleServiceInterface {
    createModule(module: CreateModuleFormData): Promise<AxiosResponse>;
}

export class CreateModuleService implements CreateModuleServiceInterface {
    async createModule(module: CreateModuleFormData): Promise<AxiosResponse> {
        const newModule = await axiosInstance.post('/create-module', module);
        return newModule;
    }
}