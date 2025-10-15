'use client';

import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import StatsCards from './StatsCards';
import ContinueLearning from './ContinueLearning';
import QuickActions from './QuickActions';
import RecommendedCourses from './RecommendedCourses';
import RecentActivity from './RecentActivity';
import CommunityHighlights from './CommunityHighlights';
import { useUserDetails } from '../useDashboard';
import SidebarLayout from '@/shared/layout/Sidebar';
import HeaderContents from '@/shared/HeaderContents';


const DashboardLayout: React.FC = () => {
  const { dashboardPage } = useUserDetails();
  
  return (
    <SidebarLayout headerChild={<HeaderContents/>} student={dashboardPage?.student}>

    <div className="max-w-7xl mx-auto pt-7">
      {/* Welcome Banner */}
      <WelcomeBanner userName={dashboardPage?.student.firstName}  level={dashboardPage?.student.level} xp={dashboardPage?.student.exp} />
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Main Content */}
      <div className="flex flex-col gap-8">
        {/* Continue Learning and Quick Actions together */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ContinueLearning coursesInProgress={dashboardPage?.coursesInProgress} />
          </div>
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <QuickActions />
          </div>
        </div>

        {/* Recommended Courses */}
        <RecommendedCourses courseRecommendation={dashboardPage?.courseRecommendations} />

        {/* Recent Activity and Community Highlights side by side */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <RecentActivity />
          </div>
          <div className="flex-1">
            <CommunityHighlights />
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>

  );
};

export default DashboardLayout;
