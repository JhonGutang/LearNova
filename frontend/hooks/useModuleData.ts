import { useState } from "react";
import { ModuleData, CreateModuleFormData } from "@/types/backend-data";
import { dummyModules } from "@/constants/moduleDummyData";
export function useModuleData() {
  const [modules, setModules] = useState<ModuleData[]>(dummyModules);

  const [createModuleformData, setCreateModuleFormData] = useState<CreateModuleFormData>({
    moduleName: "",
    moduleDescription: "",
    category: "",
    submoduleName: "",
    submoduleDescription: "",
  });

  const categories = [
    "Mathematics",
    "Science",
    "History",
    "Language",
    "Technology",
    "Other",
  ];


  return {
    modules,
    setModules,
    createModuleformData,
    setCreateModuleFormData,
    categories,
  };
}
