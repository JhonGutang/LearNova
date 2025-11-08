"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { useRedirectLink } from "@/hooks/useRedirect";
import React, { useState, useCallback } from "react";
import FallbackMessage from "@/shared/FallbackMessage";
import { Course } from "@/types/data";
import SearchCourse from "./SearchCourse";
import { Chip } from "./Chips";

const categoryOptions = [
  { label: "All", value: "ALL" },
  { label: "Featured", value: "FEATURED" },
  { label: "Enrolled", value: "ENROLLED" },
];

interface CoursesProps {
  courses: Course[];
  loading?: boolean;
  error?: any;
  category: "ALL" | "FEATURED" | "ENROLLED";
  onCategoryChange: (category: "ALL" | "FEATURED" | "ENROLLED") => void;
}

function categoriesEqual(a: string, b: string) {
  return a?.toLowerCase() === b?.toLowerCase();
}

const Courses: React.FC<CoursesProps> = ({
  courses,
  loading,
  error,
  category,
  onCategoryChange,
}) => {
  const { toSlug, redirect } = useRedirectLink();
  const [search, setSearch] = useState("");
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>(courses);

  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);

  React.useEffect(() => {
    if (!isShowingSearchResults) {
      setDisplayedCourses(courses);
    }
  }, [courses, isShowingSearchResults]);

  React.useEffect(() => {
    if (search.trim().length === 0) {
      setDisplayedCourses(courses);
      setIsShowingSearchResults(false);
    }
  }, [search, courses]);

  const handleReplaceCourses = useCallback(
    (replacementCourses: Course[]) => {
      const newCourses = replacementCourses && replacementCourses.length > 0 ? replacementCourses : courses;
      setDisplayedCourses(newCourses);
      setIsShowingSearchResults(replacementCourses.length > 0);
    },
    [courses]
  );

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

  return (
    <div className="min-h-screen bg-white w-full">
      <main className="px-4 py-6 md:px-6 min-h-[60vh] max-w-7xl mx-auto w-full">
        <section>
          <div className="flex mb-8 justify-center gap-2 flex-wrap items-center">
            {categoryOptions.map((cat) => (
              <Chip
                key={cat.value}
                type="category"
                label={cat.label}
                active={categoriesEqual(category, cat.value)}
                onClick={() => onCategoryChange(cat.value as typeof category)}
              />
            ))}
            <div className="ml-4 min-w-[220px]">
              <SearchCourse
                placeholder="Search courses..."
                value={search}
                onChange={setSearch}
                onReplaceCourses={handleReplaceCourses}
                className="w-full max-w-xs"
              />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[30vh] text-gray-500 w-full">
              Loading courses...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[30vh] text-red-500 w-full">
              Error loading courses.
            </div>
          ) : displayedCourses.length === 0 ? (
            <div className="flex justify-center items-center min-h-[30vh] text-gray-500 w-full">
              Course not found.
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {displayedCourses.map((course) => {
                const goToCourse = () =>
                  redirect("courses/" + toSlug(Number(course.id), course.title));
                return (
                  <div
                    key={course.id}
                    className="flex pt-5"
                    style={{ width: 330, maxWidth: "90vw" }}
                  >
                    <CoursesCardView
                      courseName={course.title}
                      tagline={course.tagline}
                      author={
                        course.creator.firstName + " " + course.creator.lastName
                      }
                      className="w-full"
                      chips={course.studentEnrollment ? <Chip type="enrolled" /> : undefined}
                      isEnrolled={category === "ENROLLED" ? true: false}
                      onViewClick={goToCourse}
                      onEnrollClick={
                        course.studentEnrollment ? undefined : goToCourse
                      }
                    />
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Courses;
