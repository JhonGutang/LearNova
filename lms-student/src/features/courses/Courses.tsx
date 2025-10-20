"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { useRedirectLink } from "@/hooks/useRedirect";
import React from "react";
import FallbackMessage from "@/shared/FallbackMessage";
import { Course } from "@/types/data";

// Category Chips (same as before)
const categoryOptions = [
  { label: "All", value: "ALL" },
  { label: "Featured", value: "FEATURED" },
  { label: "Enrolled", value: "ENROLLED" },
];

// Smaller Chip design
const Chip: React.FC<{ active?: boolean; onClick?: () => void; label: string }> = ({
  active,
  onClick,
  label,
}) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 rounded-full border-2 
      text-sm font-semibold mr-2 transition-all duration-150 shadow-sm
      flex items-center gap-1.5 
      ${active 
        ? "bg-teal-600 border-teal-700 text-white shadow-md scale-105"
        : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"}
      focus:outline-none focus:ring-2 focus:ring-teal-300
    `}
    style={{ minWidth: 72, minHeight: 32 }}
  >
    {label}
  </button>
);

const EnrolledChip: React.FC = () => (
  <span className="bg-green-50 text-green-900 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-300 ml-2 flex items-center shadow-sm">
    <svg
      className="w-3.5 h-3.5 mr-1 text-green-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M16.707 6.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0l-3.535-3.536a1 1 0 111.414-1.414l2.828 2.829 6.364-6.364a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    Enrolled
  </span>
);

interface CoursesProps {
  courses: Course[];
  loading?: boolean;
  error?: any;
  category: "ALL" | "FEATURED" | "ENROLLED";
  onCategoryChange: (category: "ALL" | "FEATURED" | "ENROLLED") => void;
}

const Courses: React.FC<CoursesProps> = ({
  courses,
  loading,
  error,
  category,
  onCategoryChange,
}) => {
  const { toSlug, redirect } = useRedirectLink();

  // Filtering is now unnecessary; parent already provides correct category data
  const filteredCourses = courses || [];

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

  if (!filteredCourses || filteredCourses.length === 0) {
    return (
      <div className="min-h-screen bg-white w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
          No course found.
        </div>
        <div className="mt-6 flex justify-center">
          {categoryOptions.map((cat) => (
            <Chip
              key={cat.value}
              label={cat.label}
              active={category === cat.value}
              onClick={() => onCategoryChange(cat.value as typeof category)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <main className="px-4 py-6 md:px-6 min-h-[60vh] max-w-7xl mx-auto w-full">
        <section>
          {/* Category chips */}
          <div className="flex mb-8 justify-center gap-2">
            {categoryOptions.map((cat) => (
              <Chip
                key={cat.value}
                label={cat.label}
                active={category === cat.value}
                onClick={() => onCategoryChange(cat.value as typeof category)}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredCourses.map((course) => {
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
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Courses;
