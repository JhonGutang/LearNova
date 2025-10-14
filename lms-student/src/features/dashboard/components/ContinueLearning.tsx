'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRedirectLink } from '@/hooks/useRedirect';
import { CoursesInProgress } from '@/types/data';

interface ContinueLearningProps {
  maxCourses?: number;
  coursesInProgress?: CoursesInProgress[]
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({
  coursesInProgress
}) => {
  const { redirect, toSlug } = useRedirectLink();

  // Helper function to get course icon and color based on title
  const getCourseIcon = (course: CoursesInProgress) => {
    const title = course.title?.toLowerCase() || '';
    // No categories in courseInProgress, so only use title
    if (title.includes('javascript') || title.includes('js')) {
      return { icon: 'JS', color: 'bg-yellow-500' };
    } else if (title.includes('python') || title.includes('py')) {
      return { icon: 'Py', color: 'bg-blue-600' };
    } else if (title.includes('react')) {
      return { icon: 'R', color: 'bg-blue-400' };
    } else if (title.includes('node')) {
      return { icon: 'N', color: 'bg-green-600' };
    } else if (title.includes('css')) {
      return { icon: 'C', color: 'bg-blue-500' };
    } else if (title.includes('html')) {
      return { icon: 'H', color: 'bg-orange-500' };
    } else {
      // Default icon based on first letter of title
      return { icon: course.title?.charAt(0).toUpperCase() || '?', color: 'bg-teal-600' };
    }
  };

  // Fallback if coursesInProgress is missing or not an array
  if (!Array.isArray(coursesInProgress) || coursesInProgress.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="text-center text-gray-500">
            <p>You haven&apos;t enrolled in any courses yet.</p>
            <p className="text-sm mt-1">Browse available courses to get started!</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
      <div className="space-y-4">
        {coursesInProgress.map((course) => {
          const { icon, color } = getCourseIcon(course);
          return (
            <Card key={course.title + course.courseId} className="p-6 bg-white border-2 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.tagline || ''}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progressPercentage ?? 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.progressPercentage && course.progressPercentage > 0
                        ? `Progress: ${course.progressPercentage}%`
                        : 'Ready to start your learning journey'}
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white ml-4"
                  // No id in courseInProgress, so just use title in slug
                  onClick={() => redirect(`/courses/${toSlug(Number(course.courseId), course.title)}`)}
                >
                  {course.progressPercentage && course.progressPercentage > 0 ? 'Continue' : 'Start Learning'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueLearning;
