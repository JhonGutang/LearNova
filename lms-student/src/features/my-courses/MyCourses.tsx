'use client'
import React from "react";
import { useMyCourses } from "./useMyCourses";
import CoursesCardView from "@/shared/CoursesCardView";
import FallbackMessage from "@/shared/FallbackMessage";
import { useRedirectLink } from "@/hooks/useRedirect";

const MyCourses = () => {
    const { courses, loading, error } = useMyCourses();
    const { redirect, toSlug } = useRedirectLink();

    if (loading) {
        return <FallbackMessage message="Loading your courses..." />;
    }

    if (error) {
        return <FallbackMessage message="Error loading courses." />;
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
                            isEnrolled={true}
                            onViewClick={() => redirect(toSlug(Number(course.id), course.title))}
                        />
                    </div>
                ))
            ) : (
                <div>No courses found.</div>
            )}
        </main>
    );
};

export default MyCourses;