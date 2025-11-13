"use client";
import React from "react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { useCourseById } from "./useCourseById";
import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout";
import { navItems } from "@/constants/navigationItems";
import CourseInformation from "./components/CourseInformation";
import CreateLessonFormDialog from "../create-lesson/CreateLessonFormDialog";
import CourseStateGuard from "./components/CourseStateGuard";
import LessonListView from "./components/LessonView";
import { Course } from "@/src/types/backend-data";

interface CourseByIdProps {
  name: string;
}

const CourseById: React.FC<CourseByIdProps> = ({ name }) => {
  const { fromSlug } = useRedirectLink();
  const { id, title } = fromSlug(name);
  const { course, loading, error, addNewLesson, publishCourse, updateCourse } = useCourseById(id ?? null, title);

  if (loading || error || !course) {
    return <CourseStateGuard course={course} loading={loading} error={error} />;
  }


  return (
    <TeacherHomeLayout pageTitle={title} navItems={navItems}>
      <div className="flex h-[91vh]">
        <CourseInformation course={course} publishCourse={publishCourse} onCourseUpdated={updateCourse} />
        <div className="h-full py-10 px-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">Lessons</div>
            <CreateLessonFormDialog courseId={course.id} addLesson={addNewLesson}/>
          </div>
          <div
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "calc(91vh - 80px)" }}
          >
            <LessonListView lessons={course.lessons || []} parentLink={name} />
          </div>
        </div>
      </div>
    </TeacherHomeLayout>
  );
};

export default CourseById;
