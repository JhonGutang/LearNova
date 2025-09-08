 'use client';

import { useFetchModules } from "./hooks/useFetchModules";
import React from "react";
import ModulesPresentational from "./Modules.presentational";

const ModulesContainer: React.FC = () => {
	const modules = useFetchModules();
	return (
		<ModulesPresentational modules={modules}/>
	);
};

export default ModulesContainer;
