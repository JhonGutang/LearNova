'use client'

import React from 'react';
import { navItems } from '@/constants/navigationItems';
import TeacherHomeLayout from '@/src/layout/TeacherHomeLayout';

interface DashboardProps {}

const DashboardPresentational: React.FC<DashboardProps> = (props) => {
  return (
    <TeacherHomeLayout navItems={navItems} pageTitle='Dashboard'>
      {/* Dashboard skeleton */}
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-48 w-full bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
      </div>
    </TeacherHomeLayout>
  );
};

export default DashboardPresentational;
