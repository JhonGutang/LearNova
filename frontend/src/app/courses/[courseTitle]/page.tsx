import CourseByIdContainer from "@/src/features/course-by-id/course-by-id.container";

// src/app/modules/[module-title]/page.tsx
interface CoursebydIdPageProps {
    params: {
      "courseTitle": string;
    };
  }
  
  export default async function CourseByIdPage({ params }: CoursebydIdPageProps) {
    const {courseTitle} = await params;
    return (
        <CourseByIdContainer name={courseTitle}/>
    );
  }
  