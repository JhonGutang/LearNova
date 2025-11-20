"use client";
import React, { useState, useCallback } from "react";
import SidebarLayout from "@/shared/layout/Sidebar";
import Courses from "./components/Courses";
import { useCourses, useToggleFavoriteCourse } from "./useCourses";

export const CoursesLayout = () => {
  const [category, setCategory] = useState<"ALL" | "FEATURED" | "ENROLLED">(
    "ALL"
  );
  const { coursesPageData, loading, error } = useCourses(category);
  const { toggleFavoriteCourse, loading: togglingFavorite } = useToggleFavoriteCourse();

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
        onToggleFavorite={toggleFavoriteCourse}
        togglingFavorite={togglingFavorite}
      />
    </SidebarLayout>
  );
};
