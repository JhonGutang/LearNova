'use client'
import React from 'react';
import CourseByIdPresentational from './course-by-id.presentational';
import { useRedirectLink } from '@/src/shadcn/hooks/useRedirectLink';
import { useFetchCourse } from './hook/useFetchCourse';
interface CourseByIdContainerProps {
    name: string,
}

const CourseByIdContainer: React.FC<CourseByIdContainerProps> = ({name}) => {
    const {fromSlug} = useRedirectLink();
    const {id, title} = fromSlug(name)
    const {course} = useFetchCourse(id);
    
    if (!course) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative text-center">
                    <span className="font-bold">Course Not Found</span>
                </div>
            </div>
        );
    }

    return (
        <CourseByIdPresentational name={title} course={course}/>
    );
};

export default CourseByIdContainer;
