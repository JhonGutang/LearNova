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
        const newModule = await this.moduleRepository.create(module);
        return newModule;
    }
    async getAll(): Promise<object> {
        const modules = await this.moduleRepository.getAll();
        return modules;
    }
}
