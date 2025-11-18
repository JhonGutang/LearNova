import React from "react";
import type { StatCards as StatCardsType } from "@/src/types/backend-data";

interface StatCardsProps {
  statCards?: StatCardsType;
  loading?: boolean;
  error?: any;
}

const StatCards: React.FC<StatCardsProps> = ({ statCards, loading, error }) => {
  const totalCourses = statCards?.totalCourses ?? 0;
  const totalEnrollees = statCards?.totalEnrollees ?? 0;

  if (loading) {
    return (
      <div className="flex gap-6 w-full mt-2">
        <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px] animate-pulse">
          <div className="text-lg font-semibold text-gray-300 bg-gray-200 rounded w-32 h-6"></div>
          <div className="mt-2 text-3xl font-bold text-primary-200 bg-gray-200 rounded w-14 h-8"></div>
        </div>
        <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px] animate-pulse">
          <div className="text-lg font-semibold text-gray-300 bg-gray-200 rounded w-32 h-6"></div>
          <div className="mt-2 text-3xl font-bold text-primary-200 bg-gray-200 rounded w-14 h-8"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex gap-6 w-full mt-2">
        <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px]">
          <div className="text-lg font-semibold text-red-500">Error loading stats</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 w-full mt-2">
      {/* Total Courses Card */}
      <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px]">
        <div className="text-lg font-semibold text-gray-600">Total Courses</div>
        <div className="mt-2 text-3xl font-bold text-primary-800">{totalCourses}</div>
      </div>
      {/* Total Enrollees Card */}
      <div className="flex-1 bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px]">
        <div className="text-lg font-semibold text-gray-600">Total Enrollees</div>
        <div className="mt-2 text-3xl font-bold text-primary-800">{totalEnrollees}</div>
      </div>
    </div>
  );
};

export default StatCards;
