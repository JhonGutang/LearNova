export interface ModuleData {
    title: string;
    description: string;
    totalNumberOfStudents: number;
    category: string[],
  }

  export interface CreateModuleFormData {
    moduleName: string;
    moduleDescription: string;
    category: string;
    submoduleName: string;
    submoduleDescription: string;
  }
  