import { ModulePayload } from "../interfaces/modules.interface";
import prisma from "../config/prisma";


interface ModuleRepositoryInterface {
    create(module: Object): Promise<object>;
    getAll(): Promise<object>;
}


export class ModuleRepository implements ModuleRepositoryInterface {
    async create(module: ModulePayload): Promise<object> {
        const newModule = await prisma.module.create({
            data: {
                title: module.title,
                description: module.description,
                category: module.category,
            },
        });
        return newModule
    }
    
    async getAll(): Promise<object> {
        const modules = await prisma.module.findMany();
        return modules;
    }
}