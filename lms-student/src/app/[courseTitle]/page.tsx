import CourseById from "@/features/course-by-id/CourseById";
import SidebarLayout from "@/shared/layout/Sidebar";
import React from "react";

interface PageProps {
  params: {
    courseTitle: string;
  };
}

const CourseTitlePage = async({ params }: PageProps) => {
  const { courseTitle } = await params;

  return (
    <SidebarLayout>
      <CourseById courseLink={courseTitle}/>
    </SidebarLayout>
  );
};

export default CourseTitlePage;
