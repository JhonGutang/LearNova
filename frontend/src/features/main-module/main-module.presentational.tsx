'use client'

import TeacherHomeLayout from '@/src/layout/TeacherHomeLayout';
import React from 'react';
import { navItems } from '@/constants/navigationItems';
import ListView from '@/src/shared/ListView';
import { dummyModules } from '@/constants/moduleDummyData';
import ModuleInformation from './components/ModuleInformation';
import { ModuleData } from '@/src/types/backend-data';
interface MainModulePresentationalProps {
    name: string;
    module: ModuleData
}

const MainModulePresentational: React.FC<MainModulePresentationalProps> = ({ name, module }) => {

    return (
        <TeacherHomeLayout pageTitle={name} navItems={navItems} >
            <div className='flex h-[91vh]'>
                <ModuleInformation module={module}  />
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
