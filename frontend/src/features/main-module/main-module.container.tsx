'use client'
import React from 'react';
import MainModulePresentational from './main-module.presentational';
import { useRedirectLink } from '@/src/shadcn/hooks/useRedirectLink';
interface MainModuleContainerProps {
    name: string,
}

const MainModuleContainer: React.FC<MainModuleContainerProps> = ({name}) => {
    const {fromSlug} = useRedirectLink();
    const moduleTitle = fromSlug(name)
  return (
    <MainModulePresentational name={moduleTitle}/>
  );
};

export default MainModuleContainer;
