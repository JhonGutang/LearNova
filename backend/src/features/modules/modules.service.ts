import { ModulePayload } from "../../interfaces/modules.interface";
import { ModuleRepository } from "../../repositories/modules.repository";

interface ModuleServiceInterface {
    create(module: ModulePayload): Promise<object>;
    getAll(): Promise<object>;
    getSpecificModule(moduleId: number): Promise<object>
}

function convertCategoryStringToArray(data: any): any {
    if (Array.isArray(data)) {
        return data.map((module) => ({
            ...module,
            category: typeof module.category === 'string'
                ? module.category.split(',').map((cat: string) => cat.trim())
                : module.category
        }));
    } else if (data && typeof data === 'object' && typeof data.category === 'string') {
        return {
            ...data,
            category: data.category.split(',').map((cat: string) => cat.trim())
        };
    }
    return data;
}

export class ModuleService implements ModuleServiceInterface {
    private moduleRepository: ModuleRepository;

    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    async create(module: ModulePayload): Promise<object> {
        const categoryString = Array.isArray(module.category) ? module.category.join(', ') : '';
        const moduleWithCategoryString = {
            ...module,
            category: categoryString,
        };
        const newModule = await this.moduleRepository.create(moduleWithCategoryString);
        return newModule;
    }
    
    async getAll(): Promise<object> {
        const modules: any = await this.moduleRepository.getAll();
        return convertCategoryStringToArray(modules);
    }

    async getSpecificModule(moduleId: number): Promise<object> {
        const module: any = await this.moduleRepository.getSpecificModule(moduleId);
        return convertCategoryStringToArray(module);
    }
}
