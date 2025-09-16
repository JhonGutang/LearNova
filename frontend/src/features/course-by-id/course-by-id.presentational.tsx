"use client";

import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout";
import React from "react";
import { navItems } from "@/constants/navigationItems";
import ListView from "@/src/shared/ListView";
import ModuleInformation from "./components/CourseInformation";
import { Course } from "@/src/types/backend-data";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import CreateLessonPresentational from "../create-lesson/create-lesson.presentational";
interface CourseByIdPresentationalProps {
  name: string;
  course: Course;
}

const CourseByIdPresentational: React.FC<CourseByIdPresentationalProps> = ({
  name,
  course,
}) => {
  const { redirect } = useRedirectLink();
  return (
    <TeacherHomeLayout pageTitle={name} navItems={navItems}>
      <div className="flex h-[91vh]">
        <ModuleInformation course={course} />
        <div className="h-full py-10 px-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">Lessons</div>
            <CreateLessonPresentational courseId={course.id}/>
          </div>
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(91vh - 80px)" }}
          >
            <ListView data={course.lessons} />
          </div>
        </div>
      </div>
    </TeacherHomeLayout>
  );
};

export default CourseByIdPresentational;
