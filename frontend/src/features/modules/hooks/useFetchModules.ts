import { ModuleData } from "@/src/types/backend-data";
import { useEffect, useState } from "react";
import { ModuleService } from "../Modules.service";

const moduleService = new ModuleService();

export function useFetchModules() {
    const [modules, setModules] = useState<ModuleData[]>([]);
    function getModules() {
        moduleService.getAllModules().then((modules) => {
            setModules(modules);
        });
    }
    useEffect(() => {
        getModules();
    }, []);

    return modules;
}