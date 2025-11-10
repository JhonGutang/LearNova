'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useRedirectLink } from '@/hooks/useRedirect';
import { CourseRecommendation } from '@/types/data';

// Helper function to generate background color based on title
const generateIconBg = (title: string, index: number): string => {
  const colors = [
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-pink-400 to-pink-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
  ];
  return colors[index % colors.length];
};

// Helper function to generate author name based on title
const generateAuthor = (title: string): string => {
  const authors = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'];
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return authors[hash % authors.length];
};

// Helper function to generate enrollments count
const generateEnrollments = (title: string): string => {
  const counts = ['12k', '8k', '15k', '10k'];
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return counts[hash % counts.length];
};

// Helper function to generate duration
const generateDuration = (title: string): string => {
  const durations = ['8 hours', '6 hours', '10 hours', '5 hours'];
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return durations[hash % durations.length];
};

interface RecommendedCoursesProps {
  courseRecommendation?: CourseRecommendation[];
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({
  courseRecommendation
}) => {
  const { redirect, toSlug } = useRedirectLink();

  // Use the courseRecommendation prop directly, fallback to empty array
  const courses = courseRecommendation?.slice(0, 2) || [];

  if (!courses.length) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h3>
        <div className="text-center py-8 text-gray-500">
          No recommended courses found.
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course, index) => {
          const ratingValue = course.rate?.toFixed(1) || '4.8';
          const author = generateAuthor(course.title);
          const enrollments = generateEnrollments(course.title);
          const duration = generateDuration(course.title);
          const gradientBg = generateIconBg(course.title, index);
          
          return (
            <Card 
              key={course.courseId as string} 
              className="p-4 bg-white border-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => redirect(`/courses/${toSlug(Number(course.courseId), course.title)}`)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 ${gradientBg} rounded-lg flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{author}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{ratingValue}</span>
                    </div>
                    <span>{enrollments}</span>
                    <span>{duration}</span>
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
