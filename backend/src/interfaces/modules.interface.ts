export interface Module {
    title: string;
    tagline: string;
    description: string;
    categories: string[];
    status: string;
    created_at: Date;
    updated_at: Date;
}

// Use Omit to exclude specific properties from Module
export interface ModulePayload extends Omit<Module, 'status' | 'created_at' | 'updated_at'> {}
