

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
    categories: string[],
  }


  export interface CreateModuleFormData {
    title: string;
    tagline: string;
    description: string;
    categories: string[];
  }
  

// Submodules