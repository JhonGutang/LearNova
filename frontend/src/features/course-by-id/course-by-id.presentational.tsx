'use client'

import TeacherHomeLayout from '@/src/layout/TeacherHomeLayout';
import React from 'react';
import { navItems } from '@/constants/navigationItems';
import ListView from '@/src/shared/ListView';
import { dummyCourses } from '@/constants/coursesDummyData';
import ModuleInformation from './components/CourseInformation';
import { Course } from '@/src/types/backend-data';
interface CourseByIdPresentationalProps {
    name: string;
    course: Course
}

const CourseByIdPresentational: React.FC<CourseByIdPresentationalProps> = ({ name, course }) => {

    return (
        <TeacherHomeLayout pageTitle={name} navItems={navItems} >
            <div className='flex h-[91vh]'>
                <ModuleInformation course={course}  />
                <div className="h-full py-10 px-4 flex-1 flex flex-col">
                    <div className='flex items-center justify-between mb-4'>
                        <div className='text-xl font-semibold'>Lessons</div>
                    </div>
                    <div
                        className="flex-1 overflow-y-auto"
                        style={{ maxHeight: 'calc(91vh - 80px)' }} 
                    >
                        <ListView data={dummyCourses} />
                    </div>
                </div>
            </div>
        </TeacherHomeLayout>
    );
};

export default CourseByIdPresentational;
