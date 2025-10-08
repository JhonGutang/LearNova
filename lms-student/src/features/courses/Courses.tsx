"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
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

  // Separate enrolled and available courses
  const enrolledCourses = courses?.filter((course) => course.isEnrolled) || [];
  const availableCourses = courses?.filter((course) => !course.isEnrolled) || [];

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Banner at the top */}
      <div className="px-4 pt-6 md:px-6 max-w-7xl mx-auto w-full">
        <Banner />
      </div>
      <main className="px-4 py-6 md:px-6 min-h-[60vh] max-w-7xl mx-auto w-full">
        {/* Enrolled Courses Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">Enrolled Courses</h2>
          <Button onClick={() => redirect("/my-courses")} className="bg-teal-800 hover:bg-teal-700 text-white cursor-pointer">View All</Button>
          </div>
          {enrolledCourses.length > 0 ? (
            <div className="w-[75vw] overflow-x-auto">
              <div
                className="flex gap-6 pb-2 hide-scrollbar"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  minWidth: 0,
                  maxWidth: "100%",
                }}
              >
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex-shrink-0"
                    style={{ width: 330, maxWidth: "90vw" }}
                  >
                    <CoursesCardView
                      courseName={course.title}
                      tagline={course.tagline}
                      author={course.creatorName}
                      className="w-full"
                      chips={<EnrolledChip />}
                    >
                      <div className="flex gap-2">
                        <Button
                          className={`cursor-pointer bg-teal-800 hover:bg-teal-700 text-white shadow-lg shadow-teal-800/25`}
                          onClick={() => redirect(toSlug(Number(course.id), course.title))}
                        >
                          View Course
                        </Button>
                      </div>
                    </CoursesCardView>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
              You are not enrolled in any courses yet.
            </div>
          )}
        </section>

        {/* Available Courses Section */}
        <section>
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">Available Courses</h2>
          {availableCourses.length > 0 ? (
            <div className="flex flex-wrap gap-6 justify-center">
              {availableCourses.map((course) => (
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
                  >
                    <div className="flex gap-2">
                      <Button
                        className={`cursor-pointer bg-teal-800 hover:bg-teal-700 text-white shadow-lg shadow-teal-800/25`}
                        onClick={() => redirect(toSlug(Number(course.id), course.title))}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CoursesCardView>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center min-h-[10vh] text-gray-500">
              No available courses found.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Courses;
