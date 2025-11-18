"use client";

import { useFetchCourses } from "./useFetchCourses";
import React from "react";
import { Loader2 } from "lucide-react";
import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout";
import { navItems } from "@/constants/navigationItems";
import ErrorMessage from "@/src/shared/ErrorMessage";
import CardView from "@/src/shared/CardView";
import CreateCourseForm from "../create-course/CreateCourseFormDialog";
import { CourseWithCreatorName as Course } from "@lms/shared-types";

interface CoursesHeaderProps {
  addCourse: (newCourse: Course) => void;
}

const CourseHeader: React.FC<CoursesHeaderProps> = ({ addCourse }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Courses</h2>
      <div className="flex gap-2 items-center">
        <CreateCourseForm addCourse={addCourse}/>
      </div>
    </div>
  );
};

const Courses: React.FC = () => {
  const { courses, loading, error, addNewCourse } = useFetchCourses();

  if (loading) {
    return (
      <TeacherHomeLayout navItems={navItems} pageTitle="Courses">
        <main className="p-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading courses...</span>
          </div>
        </main>
      </TeacherHomeLayout>
    );
  }

  if (error) {
    return (
      <TeacherHomeLayout navItems={navItems} pageTitle="Courses">
        <main className="p-4">
          <ErrorMessage>
            "Failed to load courses. Please try again later."{" "}
          </ErrorMessage>
        </main>
      </TeacherHomeLayout>
    );
  }

  return (
    <TeacherHomeLayout navItems={navItems} pageTitle="Courses">
      <main className="p-4">
        <CourseHeader addCourse={addNewCourse}/>
        <CardView data={courses} />
      </main>
    </TeacherHomeLayout>
  );
};

export default Courses;
