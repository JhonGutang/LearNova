import { ModulePayload } from "../../interfaces/modules.interface";
import { ModuleRepository } from "../../repositories/modules.repository";

interface ModuleServiceInterface {
    create(module: ModulePayload): Promise<object>;
    getAll(): Promise<object>;
}

export class ModuleService implements ModuleServiceInterface {
    private moduleRepository: ModuleRepository;

    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    async create(module: ModulePayload): Promise<object> {
        // Combine the category array into a single string
        const categoryString = Array.isArray(module.category) ? module.category.join(', ') : '';
        // Replace the category value with the new string
        const moduleWithCategoryString = {
            ...module,
            category: categoryString,
        };
        const newModule = await this.moduleRepository.create(moduleWithCategoryString);
        return newModule;
    }
    
    async getAll(): Promise<object> {
        const modules: any = await this.moduleRepository.getAll();
        // Transform category string to array for each module
        const transformedModules = Array.isArray(modules)
            ? modules.map((module: any) => ({
                ...module,
                category: typeof module.category === 'string'
                    ? module.category.split(',').map((cat: string) => cat.trim())
                    : module.category
            }))
            : modules;
        return transformedModules;
    }
}
