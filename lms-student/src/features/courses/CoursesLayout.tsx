'use client'
import SidebarLayout from "@/shared/layout/Sidebar"
import Courses from "./Courses"
import { useCourses } from "./useCourses"

export const CoursesLayout = () => {
    const { coursesPageData, loading, error } = useCourses();
    return (
        <SidebarLayout student={coursesPageData?.student}>
            <Courses
                enrolledCourses={coursesPageData?.enrollCourse || []}
                featuredCourses={coursesPageData?.featuredCourses || []}
                allCourses={coursesPageData?.allCourses || []}
                loading={loading}
                error={error}
            />
        </SidebarLayout>
    );
}