'use client'
import React, { useState, useCallback } from "react";
import SidebarLayout from "@/shared/layout/Sidebar"
import Courses from "./Courses"
import { useCourses } from "./useCourses"

export const CoursesLayout = () => {
    const [category, setCategory] = useState<"ALL" | "FEATURED" | "ENROLLED">("ALL");
    const { coursesPageData, loading, error } = useCourses(category);

    // function to be passed to Courses for changing the current course category
    const handleCategoryChange = useCallback(
        (newCategory: "ALL" | "FEATURED" | "ENROLLED") => setCategory(newCategory),
        []
    );

    return (
        <SidebarLayout student={coursesPageData?.student}>
            <Courses
                courses={coursesPageData?.courses || []}
                loading={loading}
                error={error}
                category={category}
                onCategoryChange={handleCategoryChange}
            />
        </SidebarLayout>
    );
}