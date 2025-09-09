import axiosInstance from "@/lib/axios";
import { ModuleData } from "@/src/types/backend-data";

interface ModuleServiceInterface {
    getAllModules(): Promise<ModuleData[]>;
}


export class ModuleService implements ModuleServiceInterface {
    async getAllModules(): Promise<ModuleData[]> {
        const response = await axiosInstance.get('/modules');
        return response.data;
    }
}