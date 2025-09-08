import { useState } from "react";
import { ModuleData, CreateModuleFormData } from "@/types/backend-data";
import { dummyModules } from "@/constants/moduleDummyData";
import { ModuleService } from "../Modules.service";
import { CATEGORIES } from "@/constants/moduleDummyData";


export function useCreateModules() {
    const [modules, setModules] = useState<ModuleData[]>(dummyModules);
    const [createModuleformData, setCreateModuleFormData] = useState<CreateModuleFormData>({
        moduleName: "",
        moduleDescription: "",
        category: "",
        submoduleName: "",
        submoduleDescription: "",
    });

    return {
        modules,
        setModules,
        createModuleformData,
        setCreateModuleFormData,
        CATEGORIES,
    };
}
