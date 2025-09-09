'use client'

import TeacherHomeLayout from '@/src/layout/TeacherHomeLayout';
import React from 'react';
import { navItems } from '@/constants/navigationItems';
import ListView from '@/src/shared/ListView';
import { dummyModules } from '@/constants/moduleDummyData';
import ModuleInformation from './components/ModuleInformation';
interface MainModulePresentationalProps {
    name: string;
}


const categories = ['Mathematics', 'Science'];
const totalParticipants = 42;
const dummyDescription = "This module provides a comprehensive overview of key concepts and foundational principles in mathematics and science. Through engaging lessons and interactive activities, students will develop critical thinking skills and gain a deeper understanding of the subject matter. The content is designed to be accessible and relevant, fostering curiosity and a love for learning in every participant.";

const MainModulePresentational: React.FC<MainModulePresentationalProps> = ({ name }) => {

    const dummyModule = {
        title: name,
        description: dummyDescription,
        category: categories,
        totalNumberOfStudents: totalParticipants,
    }

    return (
        <TeacherHomeLayout pageTitle={name} navItems={navItems} >
            <div className='flex h-[91vh]'>
                <ModuleInformation module={dummyModule}  />
                <div className="h-full py-10 px-4 flex-1 flex flex-col">
                    <div className='flex items-center justify-between mb-4'>
                        <div className='text-xl font-semibold'>Sub Modules</div>
                    </div>
                    <div
                        className="flex-1 overflow-y-auto"
                        style={{ maxHeight: 'calc(91vh - 80px)' }} 
                    >
                        <ListView data={dummyModules} />
                    </div>
                </div>
            </div>
        </TeacherHomeLayout>
    );
};

export default MainModulePresentational;
