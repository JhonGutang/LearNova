import React from "react";
import { CourseWithCreatorName as Course } from "@lms/shared-types";
import { Card, CardContent, CardFooter } from "@/src/shadcn/components/ui/card";
import { useRedirectLink } from "../shadcn/hooks/useRedirectLink";

interface CardViewProps {
    data: Course[];
}

const CardView: React.FC<CardViewProps> = ({ data }) => {
  const {redirect, toSlug} = useRedirectLink();
  // A helper to color status chip
  const getStatusChipStyles = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return { backgroundColor: '#43a047', color: '#fff' };
      case 'DRAFT':
        return { backgroundColor: '#ffa000', color: '#fff' };
      case 'UNLISTED':
        return { backgroundColor: '#e0e0e0', color: '#333' };
      default:
        return { backgroundColor: '#e0e0e0', color: '#333' };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((course, idx) => {
        const categories = Array.isArray(course.categories) ? course.categories : [course.categories];

        return (
          <Card
            key={idx}
            className="hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden rounded-lg relative"
          >
            {/* Fixed overlayed status chip at top right */}
            <div className="absolute top-3 right-3 z-30">
              <span
                className="chip capitalize text-xs px-2 py-1"
                style={getStatusChipStyles(course.status)}
              >
                {course.status}
              </span>
            </div>

            {/* Blue-themed illustration section */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* React logo placeholder - simplified atom structure */}
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-60"></div>
                  <div className="absolute inset-4 rounded-full border-4 border-blue-500 opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-blue-400/30 rounded-lg"></div>
              <div className="absolute top-8 right-8 w-8 h-8 bg-blue-500/40 rounded"></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-blue-300/50 rounded-lg"></div>
              <div className="absolute bottom-8 left-8 w-6 h-6 bg-blue-400/40 rounded-full"></div>
            </div>

            {/* Content section */}
            <CardContent className="flex-1 flex flex-col p-6">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {course.title}
              </h2>
              
              {/* Description */}
              <p className="text-gray-700 mb-1 text-[15px]">
                {course.tagline}
              </p>
              
              {/* Total participants */}
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <svg
                  className="w-4 h-4 mr-1 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5 5.87v-2a4 4 0 00-3-3.87m6 0A4 4 0 0012 7a4 4 0 00-4 4v1a4 4 0 003 3.87m6 0v-1a4 4 0 00-4-4m-2-3a2 2 0 114 0 2 2 0 01-4 0z"
                  />
                </svg>
                <span>
                  {typeof course.totalNumberOfParticipants === 'number'
                    ? `${course.totalNumberOfParticipants} participant${course.totalNumberOfParticipants === 1 ? '' : 's'}`
                    : '—'}
                </span>
              </div>
              
              {/* Chips container - scrollable one row, no visible scroll controls */}
              <div
                className="flex gap-2 mb-6 overflow-x-auto whitespace-nowrap"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Hide scrollbar in Webkit browsers */}
                <style>
                  {`
                    .hide-scrollbar::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>
                <div className="flex hide-scrollbar">
                  {categories.map((cat, i) => (
                    <span 
                      key={i} 
                      className="chip capitalize text-xs px-3 py-1 mr-1 inline-block" 
                      style={{ 
                        backgroundColor: '#E3F2FD', 
                        color: '#1976D2' 
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Spacer */}
              <div className="flex-1" />
              
              {/* View Course button */}
              <CardFooter className="p-0 mt-auto">
                <button
                  onClick={() => redirect('/courses/' + toSlug(Number(course.id), course.title))}
                  className="w-full bg-[#11a4f7] hover:bg-[#078cd6] text-white font-semibold py-2.5 rounded-lg transition-all duration-150 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{
                    boxShadow: "0 1px 3px 0 rgba(10,82,200,0.08)",
                  }}
                >
                  View Course
                </button>
              </CardFooter>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CardView;
