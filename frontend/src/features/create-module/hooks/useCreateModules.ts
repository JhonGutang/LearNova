import { useState } from "react";
import { ModuleData, CreateModuleFormData } from "@/src/types/backend-data";
import { dummyModules } from "@/constants/moduleDummyData";
import { CATEGORIES } from "@/constants/moduleDummyData";
import { CreateModuleService } from "../create-module.service";

const createModuleService = new CreateModuleService();

export function useCreateModules() {
    const [modules, setModules] = useState<ModuleData[]>(dummyModules);
    const [createModuleformData, setCreateModuleFormData] = useState<CreateModuleFormData>({
        title: "",
        tagline: "",
        description: "",
        categories: [],
    });

    const handleSelectCategories = (category: string) => {
        setCreateModuleFormData((prev) => {
            const prevCategories = prev.categories;
            let newCategories: string[];
            if (prevCategories.includes(category)) {
                newCategories = prevCategories.filter((c) => c !== category);
            } else {
                newCategories = [...prevCategories, category];
            }
            return {
                ...prev,
                categories: newCategories,
            };
        });
    };

    const saveModule = async () => {
        try {
            await createModuleService.createModule(createModuleformData);
        } catch (error) {
            console.error("Failed to create module:", error);
        }
    }

    return {
        modules,
        setModules,
        createModuleformData,
        setCreateModuleFormData,
        CATEGORIES,
        handleSelectCategories,
        saveModule,
    };
}
