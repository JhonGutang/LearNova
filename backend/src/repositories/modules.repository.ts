import { ModulePayload } from "../interfaces/modules.interface";
import prisma from "../config/prisma";

interface ModuleRepositoryInterface {
    create(module: Object): Promise<object>;
    getAll(): Promise<object>;
    getSpecificModule(moduleId: number): Promise<object | null>;
}

export class ModuleRepository implements ModuleRepositoryInterface {
    async create(module: ModulePayload): Promise<object> {
        const newModule = await prisma.module.create({
            data: {
                title: module.title,
                description: module.description,
                tagline: module.tagline,
                // Connect or create categories via the join table
                categories: {
                    create: module.categories.map((categoryName: string) => ({
                        category: {
                            connectOrCreate: {
                                where: { name: categoryName },
                                create: { name: categoryName }
                            }
                        }
                    }))
                }
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return newModule;
    }

    async getAll(): Promise<object> {
        const modules = await prisma.module.findMany({
            include: {
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return modules;
    }

    async getSpecificModule(moduleId: number): Promise<object | null> {
        const module = await prisma.module.findUnique({
            where: {
                id: moduleId,
            },
            include: {
                categories: {
                    include: {
                        category: {
                            select: {
                                name: true,
                            },
                        }
                    }
                }
            }
        });
        return module;
    }
}