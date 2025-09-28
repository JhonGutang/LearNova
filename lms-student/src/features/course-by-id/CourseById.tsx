'use client'
import React, { useEffect, useState } from "react"
import { useRedirectLink } from "@/hooks/useRedirect"
import { useCourseById } from "./useCourseById"
interface CourseByIdProps {
    courseLink: string
}

const CourseById: React.FC<CourseByIdProps> = ({ courseLink }) => {
    const { fromSlug } = useRedirectLink();
    const { id, title } = fromSlug(courseLink);

    const { course, loading, error } = useCourseById(id, title);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8">Error loading course.</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">hello {course?.title}</h1>
        </div>
    );
}


export default CourseById

