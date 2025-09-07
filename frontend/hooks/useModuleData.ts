import { useState } from "react";
import { ModuleData } from "@/types/backend-data";
import { dummyModules } from "@/constants/moduleDummyData";



export function useModuleData() {
  const [modules, setModules] = useState<ModuleData[]>(dummyModules);

  // In a real hook, you might fetch data here

  return {
    modules,
    setModules,
  };
}
