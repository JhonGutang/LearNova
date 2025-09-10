

// Modules
enum Status {
  PUBLISHED,
  DRAFT,
  UNLISTED,
}

export interface ModuleData {
    id?: number;
    title: string;
    tagline: string;
    description: string;
    status: Status;
    totalNumberOfStudents: number;
    category: string[],
  }


  export interface CreateModuleFormData {
    title: string;
    tagline: string;
    description: string;
    category: string[];
  }
  

// Submodules