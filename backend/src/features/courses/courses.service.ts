import { CoursePayload } from "../../interfaces/course.interface";
import { CourseRepository } from "../../repositories/course.repository";

interface CourseServiceInterface {
    create(module: CoursePayload): Promise<object>;
    getAll(): Promise<object>;
    getById(moduleId: number): Promise<object>
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

export class CourseService implements CourseServiceInterface {
    private courseRepository: CourseRepository;

    constructor() {
        this.courseRepository = new CourseRepository();
    }

    async create(module: CoursePayload): Promise<object> {
        const newModule = await this.courseRepository.create(module);
        return newModule;
    }
    
    async getAll(): Promise<object> {
        const modules: any = await this.courseRepository.getAll();
        return normalizeCategories(modules);
    }

    async getById(moduleId: number): Promise<object> {
        const module = await this.courseRepository.getSpecificCourse(moduleId);
        return normalizeCategories(module);
    }
}
