"use client";

import React from "react";
import { FileText } from "lucide-react";
import StatsCards from "./StatsCards";
import ActivityCalendar from "./ActivityCalendar";
import DailyMotivation from "./DailyMotivation";
import ContinueLearning from "./ContinueLearning";
import RecommendedCourses from "./RecommendedCourses";
import { useUserDetails } from "../useDashboard";
import SidebarLayout from "@/shared/layout/Sidebar";
import HeaderContents from "@/shared/HeaderContents";

const DashboardLayout: React.FC = () => {
  const { dashboardPage } = useUserDetails();

  // Calculate stats from dashboard data
  const coursesEnrolled = dashboardPage?.coursesInProgress?.length || 12;
  const completionRate = dashboardPage?.coursesInProgress?.length
    ? Math.round(
        dashboardPage.coursesInProgress.reduce(
          (acc, course) => acc + (course.progressPercentage || 0),
          0
        ) / dashboardPage.coursesInProgress.length
      )
    : 78;

  return (
    <SidebarLayout
      headerChild={<HeaderContents />}
      student={dashboardPage?.student}
    >
      <div className="max-w-7xl mx-auto pt-7">
        {/* Activity Calendar and Daily Motivation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ActivityCalendar />
          <div>
            <StatsCards
              coursesEnrolled={coursesEnrolled}
              hoursLearned={48}
              completionRate={completionRate}
              certificates={5}
            />
            <DailyMotivation />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="basis-[63%]">
            {/* Continue Learning */}
            <ContinueLearning
              coursesInProgress={dashboardPage?.coursesInProgress}
            />
          </div>
          <div className="basis-[37%]">
            {/* Recommended Courses */}
            <RecommendedCourses
              courseRecommendation={dashboardPage?.courseRecommendations}
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default DashboardLayout;
