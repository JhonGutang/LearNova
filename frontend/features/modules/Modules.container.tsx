 'use client';

import { useModuleData } from "@/hooks/useModuleData";
import React from "react";
import ModulesPresentational from "./Modules.presentational";

const ModulesContainer: React.FC = () => {
    const { modules } = useModuleData();
  return (
   <ModulesPresentational modules={modules}/>
  );
};

export default ModulesContainer;
