'use client'
import React from "react";
import TeacherHomeLayout from "@/src/layout/TeacherHomeLayout";
import { navItems } from "@/constants/navigationItems";
import StackedBarGraphs from "./components/StackedBarGraphs";
import StatCards from "./components/StatCards";
import PieChart from "./components/PieChart";
import { useStats } from "./useStats";

const Dashboard: React.FC = () => {
  const { barCharts, statCards, loading, error } = useStats();

  return (
    <TeacherHomeLayout navItems={navItems} pageTitle="Dashboard">
      <div className="flex flex-row gap-8 w-full">
        {/* StackedBarGraphs and StatCards layout -- reduced width for StackedBarGraphs */}
        <div className="flex-1 min-w-0 basis-1/2 max-w-[650px]">
          <StackedBarGraphs barCharts={barCharts} loading={loading} error={error} />
        </div>
        <div className="flex flex-col justify-start min-w-[240px] max-w-xs flex-shrink-0 basis-1/2">
          <StatCards statCards={statCards} loading={loading} error={error} />
          <div className="mt-8">
            <PieChart />
          </div>
        </div>
      </div>
    </TeacherHomeLayout>
  );
};

export default Dashboard;