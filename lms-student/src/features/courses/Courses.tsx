"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { Button } from "@/components/ui/button";
import { useCoursesWithCreator } from "./useCourses";
import { useRedirectLink } from "@/hooks/useRedirect";
import React from "react";
import FallbackMessage from "@/shared/FallbackMessage";
import Banner from "@/features/ads/Banner"; // Import the Banner

const EnrolledChip: React.FC = () => (
  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-300">
    Enrolled
  </span>
);

const Courses: React.FC = () => {
  const { courses, loading, error } = useCoursesWithCreator();
  const { toSlug, redirect } = useRedirectLink();

  if (loading) {
    return (
      <FallbackMessage message="Loading courses..." />
    );
  }

  if (error) {
    return (
      <FallbackMessage message="Failed to load courses" isError={true} />
    );
  }

  // If there are no courses at all
  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-white w-full">
        <div className="px-4 pt-6 md:px-6 max-w-7xl mx-auto w-full">
          <Banner />
        </div>
        <main className="px-4 py-6 md:px-6 min-h-[60vh] max-w-7xl mx-auto w-full">
          <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
            No courses found.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <main className="px-4 py-6 md:px-6 min-h-[60vh] max-w-7xl mx-auto w-full">
        <section>
          <div className="flex justify-end items-center mb-4">
            <Button
              onClick={() => redirect("/my-courses")}
              className="bg-teal-800 hover:bg-teal-700 text-white cursor-pointer"
            >
              View All
            </Button>
          </div>
          {courses.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex"
                  style={{ width: 330, maxWidth: "90vw" }}
                >
                  <CoursesCardView
                    courseName={course.title}
                    tagline={course.tagline}
                    author={course.creatorName}
                    className="w-full"
                    chips={course.isEnrolled ? <EnrolledChip /> : undefined}
                    isEnrolled={course.isEnrolled}
                    onEnrollClick={() => redirect("courses/" + toSlug(Number(course.id), course.title))}
                    onViewClick={() => redirect("courses/" + toSlug(Number(course.id), course.title))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
              No courses found.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Courses;
