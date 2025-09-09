import { useState, useEffect } from "react";
import { MainModuleService } from "../main-module.service";
import { AxiosResponse } from "axios";
import { ModuleData } from "@/src/types/backend-data";

const mainModuleService = new MainModuleService();

export function useFetchModule(moduleId: number | null) {
    const [module, setModule] = useState<ModuleData | null>();

    const handleGetModule = (moduleId: number) => {
        mainModuleService.getSpecificModule(moduleId)
        .then((response: AxiosResponse) => {
            setModule(response.data);
        })
        .catch((error) => {
            console.error("Failed to fetch module:", error);
        });
    }

    useEffect(() => {
        if(!moduleId) return
        handleGetModule(moduleId);
    }, [moduleId]);

    return {
        module,
        setModule,
        handleGetModule,
    };
}
