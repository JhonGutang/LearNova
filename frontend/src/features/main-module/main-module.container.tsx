'use client'
import React from 'react';
import MainModulePresentational from './main-module.presentational';
import { useRedirectLink } from '@/src/shadcn/hooks/useRedirectLink';
import { useFetchModule } from './hook/useFetchModule';
interface MainModuleContainerProps {
    name: string,
}

const MainModuleContainer: React.FC<MainModuleContainerProps> = ({name}) => {
    const {fromSlug} = useRedirectLink();
    const {id, title} = fromSlug(name)
    const {module} = useFetchModule(id);
    
    if (!module) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative text-center">
                    <span className="font-bold">Module Not Found</span>
                </div>
            </div>
        );
    }

    return (
        <MainModulePresentational name={title} module={module}/>
    );
};

export default MainModuleContainer;
