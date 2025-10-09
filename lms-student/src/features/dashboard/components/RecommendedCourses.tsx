'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useRedirectLink } from '@/hooks/useRedirect';
import { CourseRecommendation } from '@/types/data';

// Helper function to generate icon from course title
const generateIcon = (title: string): string => {
  const words = title.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return title.substring(0, 2).toUpperCase();
};

// Helper function to generate background color based on title
const generateIconBg = (title: string): string => {
  const colors = [
    'bg-orange-500',
    'bg-blue-600', 
    'bg-blue-800',
    'bg-green-600',
    'bg-purple-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-indigo-600'
  ];
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Helper function to generate rating (random between 4.0 and 5.0)
const generateRating = (title: string): number => {
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.round((4.0 + (hash % 10) / 10) * 10) / 10;
};

interface RecommendedCoursesProps {
  courseRecommendation?: CourseRecommendation[];
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({
  courseRecommendation
}) => {
  const { redirect, toSlug } = useRedirectLink();

  // Use the courseRecommendation prop directly, fallback to empty array
  const courses = courseRecommendation?.slice(0, 4) || [];

  // Loading and error states are not needed since we are not fetching here

  if (!courses.length) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Recommended for You</h3>
          <Button 
            variant="ghost" 
            className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            onClick={() => redirect("/courses")}
          >
            View All
          </Button>
        </div>
        <div className="text-center py-8 text-gray-500">
          No recommended courses found.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Recommended for You</h3>
        <Button 
          variant="ghost" 
          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
          onClick={() => redirect("/courses")}
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => {
          // Ensure rating is always shown with 1 decimal place
          const ratingValue = course.rate ?? generateRating(course.title);
          const ratingDisplay = ratingValue.toFixed(1);
          return (
            <Card 
              key={course.courseId as string} 
              className="p-4 bg-white border-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => redirect(`/courses/${toSlug(Number(course.courseId), course.title)}`)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${generateIconBg(course.title)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {generateIcon(course.title)}
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    FREE
                  </span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{course.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{course.tagline || 'Learn something new'}</p>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{ratingDisplay}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedCourses;
