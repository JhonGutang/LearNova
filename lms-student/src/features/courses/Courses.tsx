"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { Button } from "@/components/ui/button";
import { useRedirectLink } from "@/hooks/useRedirect";
import React, { useState } from "react";
import FallbackMessage from "@/shared/FallbackMessage";
import { Course, StudentEnrollment } from "@/types/data";

const EnrolledChip: React.FC = () => (
  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-300">
    Enrolled
  </span>
);

type FilterType = "all" | "enrolled" | "featured";

const filterChips: { label: string; value: FilterType }[] = [
  { label: "Enrolled Courses", value: "enrolled" },
  { label: "Featured Courses", value: "featured" },
  { label: "All Courses", value: "all" },
];

interface CoursesProps {
  enrolledCourses: Course[];
  featuredCourses: Course[];
  allCourses: Course[];
  loading?: boolean;
  error?: any;
}

// Internal helper to deduce featured
const isFeatured = (course: Course) =>
  typeof (course as any).isFeatured !== "undefined"
    ? (course as any).isFeatured
    : Number(course.id) % 2 === 1; // Fallback dummy logic

const Courses: React.FC<CoursesProps> = ({
  enrolledCourses,
  featuredCourses,
  allCourses,
  loading,
  error,
}) => {
  const { toSlug, redirect } = useRedirectLink();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  let filteredCourses: Course[];
  if (selectedFilter === "all") {
    filteredCourses = allCourses;
  } else if (selectedFilter === "enrolled") {
    filteredCourses = enrolledCourses;
  } else {
    filteredCourses = featuredCourses;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex justify-center items-center">
        <span className="text-gray-500">Loading courses...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white w-full flex justify-center items-center">
        <FallbackMessage message="Failed to load courses." />
      </div>
    );
  }

  if (!allCourses || allCourses.length === 0) {
    return (
      <div className="min-h-screen bg-white w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-end items-center mb-4 max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 mr-4">
            {filterChips.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setSelectedFilter(chip.value)}
                className={`px-3 py-1 text-xs rounded-full font-semibold border focus:outline-none transition
                  ${
                    selectedFilter === chip.value
                      ? "bg-teal-50 border-teal-700 text-teal-900"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <Button
            onClick={() => redirect("/my-courses")}
            className="bg-teal-800 hover:bg-teal-700 text-white cursor-pointer"
          >
            View All
          </Button>
        </div>
        <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
          No courses found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <main className="px-4 py-6 md:px-6 min-h-[60vh] max-w-7xl mx-auto w-full">
        <section>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 mr-4 ">
              {filterChips.map((chip) => (
                <button
                  key={chip.value}
                  type="button"
                  onClick={() => setSelectedFilter(chip.value)}
                  className={`px-4 py-2 text-sm rounded-full font-semibold border focus:outline-none transition
                    ${
                      selectedFilter === chip.value
                        ? "bg-teal-50 border-teal-700 text-teal-900"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {(filteredCourses || []).length === 0 ? (
              <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
                No courses found for selected filter.
              </div>
            ) : (
              filteredCourses.map((course) => {
                // If the course is enrolled, swap enroll->view, and no enroll button, just "View"
                const goToCourse = () =>
                  redirect("courses/" + toSlug(Number(course.id), course.title));
                return (
                  <div
                    key={course.id}
                    className="flex"
                    style={{ width: 330, maxWidth: "90vw" }}
                  >
                    <CoursesCardView
                      courseName={course.title}
                      tagline={course.tagline}
                      author={
                        course.creator.firstName + " " + course.creator.lastName
                      }
                      className="w-full"
                      chips={course.studentEnrollment ? <EnrolledChip /> : undefined}
                      isEnrolled={!!course.studentEnrollment}
                      onViewClick={goToCourse}
                      onEnrollClick={
                        course.studentEnrollment ? undefined : goToCourse
                      }
                    />
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Courses;
