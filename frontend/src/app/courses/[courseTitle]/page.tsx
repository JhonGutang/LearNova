import CourseById from "@/src/features/course-by-id/CourseById";
interface CoursebydIdPageProps {
    params: {
      "courseTitle": string;
    };
  }
  
  export default async function CourseByIdPage({ params }: CoursebydIdPageProps) {
    const {courseTitle} = await params;
    return (
        <CourseById name={courseTitle}/>
    );
  }
  