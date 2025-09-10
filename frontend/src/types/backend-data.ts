

// Course
export enum Status {
  PUBLISHED,
  DRAFT,
  UNLISTED,
}

export interface Course {
    id?: number;
    title: string;
    tagline: string;
    description: string;
    status: Status;
    totalNumberOfStudents: number;
    categories: string[],
  }


  export interface CreateCourseFormData {
    title: string;
    tagline: string;
    description: string;
    categories: string[];
  }
  

// Topics