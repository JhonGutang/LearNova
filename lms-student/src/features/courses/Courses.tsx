"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useCoursesWithCreator } from "./useCourses";
import { useRedirectLink } from "@/hooks/useRedirect";
import React from "react";
import FallbackMessage from "@/shared/FallbackMessage";

const EnrolledChip: React.FC = () => (
  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-300">
    Enrolled
  </span>
);

const Courses: React.FC = () => {
  const { courses, loading, error } = useCoursesWithCreator();
  const { toSlug, redirect } = useRedirectLink()
  if (loading) {
    return (
      <FallbackMessage message="Loading courses..."/>
    );
  }

  if (error) {
    return (
     <FallbackMessage message="Failed to load courses" isError={true}/>
    );
  }

  return (
    <>
      <main className="p-6 flex flex-wrap gap-6 justify-center items-center min-h-[60vh]">
        {courses?.length ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="flex"
              style={{ width: 330 }}
            >
              <CoursesCardView
                courseName={course.title}
                tagline={course.tagline}
                author={course.creatorName}
                className="w-full"
                chips={course.isEnrolled ? <EnrolledChip /> : undefined}
              >
                <div className="flex gap-2">
                  <Button
                    className={`cursor-pointer bg-black hover:bg-gray-900 text-white`}
                    onClick={() => redirect(toSlug(Number(course.id), course.title))}
                  >
                    {course.isEnrolled ? "View Course" : "Enroll Now"}
                  </Button>
                </div>
              </CoursesCardView>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center min-h-[30vh]">No courses found.</div>
        )}
      </main>
    </>
  );
};

export default Courses;
