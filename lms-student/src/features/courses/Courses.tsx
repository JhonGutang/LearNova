"use client";

import CoursesCardView from "@/shared/CoursesCardView";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useCoursesWithCreator } from "./useCourses";

const Courses: React.FC = () => {
  const { courses, loading, error } = useCoursesWithCreator();

  if (loading) {
    return (
      <main className="p-6 flex flex-wrap gap-6">
        <div>Loading courses...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 flex flex-wrap gap-6">
        <div className="text-red-500">Failed to load courses.</div>
      </main>
    );
  }

  return (
    <main className="p-6 flex flex-wrap gap-6 justify-start">
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
            >
              <div className="flex gap-2">
                <Button className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white">
                  View
                </Button>
                <Button
                  className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white"
                  variant="secondary"
                  aria-label="Add to Favorites"
                >
                  <Star className="w-5 h-5" />
                </Button>
              </div>
            </CoursesCardView>
          </div>
        ))
      ) : (
        <div>No courses found.</div>
      )}
    </main>
  );
};

export default Courses;
