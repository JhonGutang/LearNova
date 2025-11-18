import React from "react";

const StatCards = () => {
  // Placeholder values, replace with props or context/data hook as needed
  const totalCourses = 8;
  const totalEnrollees = 325;

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
