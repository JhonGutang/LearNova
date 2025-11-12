import React from "react";
import { Course } from "@/src/types/backend-data";
import { Card, CardContent, CardFooter } from "@/src/shadcn/components/ui/card";
import { useRedirectLink } from "../shadcn/hooks/useRedirectLink";

interface CardViewProps {
    data: Course[];
}

const CardView: React.FC<CardViewProps> = ({ data }) => {
  const {redirect, toSlug} = useRedirectLink();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((course, idx) => {
        const categories = Array.isArray(course.categories) ? course.categories : [course.categories];
        const displayedCategories = categories.slice(0, 2);
        const remainingCount = categories.length - displayedCategories.length;

        return (
          <Card
            key={idx}
            className="hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden rounded-lg"
          >
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
              {/* Status chip at right bottom */}
              <div className="absolute bottom-3 right-3">
                <span className="chip capitalize text-xs px-2 py-1" style={{ 
                  backgroundColor: course.status === 'PUBLISHED' ? '#43a047' : course.status === 'DRAFT' ? '#ffa000' : '#e0e0e0',
                  color: course.status === 'UNLISTED' ? '#333' : '#fff'
                }}>
                  {course.status}
                </span>
              </div>
            </div>

            {/* Content section */}
            <CardContent className="flex-1 flex flex-col p-6">
              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {course.title}
              </h2>
              
              {/* Description */}
              <p className="text-gray-700 mb-4 text-[15px]">
                {course.tagline}
              </p>
              
              {/* Chips container - pill-shaped */}
              <div className="flex flex-wrap gap-2 mb-6">
                {displayedCategories.map((cat, i) => (
                  <span 
                    key={i} 
                    className="chip capitalize text-xs px-3 py-1" 
                    style={{ 
                      backgroundColor: '#E3F2FD', 
                      color: '#1976D2' 
                    }}
                  >
                    {cat}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span 
                    className="chip text-xs px-3 py-1" 
                    style={{ 
                      backgroundColor: '#E3F2FD', 
                      color: '#1976D2' 
                    }}
                  >
                    +{remainingCount} more
                  </span>
                )}
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
