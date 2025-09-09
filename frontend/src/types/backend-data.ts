export interface ModuleData {
    id?: number;
    title: string;
    tagline: string;
    description: string;
    totalNumberOfStudents: number;
    category: string[],
  }

  export interface CreateModuleFormData {
    title: string;
    tagline: string;
    description: string;
    category: string[];
  }
  