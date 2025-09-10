import { ModulePayload, Module } from "../../interfaces/modules.interface";
import { ModuleRepository } from "../../repositories/modules.repository";

interface ModuleServiceInterface {
    create(module: ModulePayload): Promise<object>;
    getAll(): Promise<object>;
    getSpecificModule(moduleId: number): Promise<object>
}

function normalizeCategories(input: any): any {
    if (Array.isArray(input)) {
        return input.map((module: any) => ({
            ...module,
            categories: module.categories.map((category: any) => category.category.name)
        }));
    } else if (input && typeof input === 'object') {
        return {
            ...input,
            categories: input.categories.map((category: any) => category.category.name)
        };
    }
    return input;
}

export class ModuleService implements ModuleServiceInterface {
    private moduleRepository: ModuleRepository;

    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    async create(module: ModulePayload): Promise<object> {
        const newModule = await this.moduleRepository.create(module);
        return newModule;
    }
    
    async getAll(): Promise<object> {
        const modules: any = await this.moduleRepository.getAll();
        return normalizeCategories(modules);
    }

    async getSpecificModule(moduleId: number): Promise<object> {
        const module = await this.moduleRepository.getSpecificModule(moduleId);
        return normalizeCategories(module);
    }
}
