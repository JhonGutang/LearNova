'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRedirectLink } from '@/hooks/useRedirect';
import { useMyCourses } from '@/features/my-courses/useMyCourses';

interface ContinueLearningProps {
  maxCourses?: number;
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({
  maxCourses = 2
}) => {
  const { redirect, toSlug } = useRedirectLink();
  const { courses, loading, error } = useMyCourses();

  // Helper function to get course icon and color based on title or categories
  const getCourseIcon = (course: any) => {
    const title = course.title.toLowerCase();
    const categories = course.categories || [];
    
    if (title.includes('javascript') || title.includes('js') || categories.includes('JavaScript')) {
      return { icon: 'JS', color: 'bg-yellow-500' };
    } else if (title.includes('python') || title.includes('py') || categories.includes('Python')) {
      return { icon: 'Py', color: 'bg-blue-600' };
    } else if (title.includes('react') || categories.includes('React')) {
      return { icon: 'R', color: 'bg-blue-400' };
    } else if (title.includes('node') || categories.includes('Node.js')) {
      return { icon: 'N', color: 'bg-green-600' };
    } else if (title.includes('css') || categories.includes('CSS')) {
      return { icon: 'C', color: 'bg-blue-500' };
    } else if (title.includes('html') || categories.includes('HTML')) {
      return { icon: 'H', color: 'bg-orange-500' };
    } else {
      // Default icon based on first letter of title
      return { icon: course.title.charAt(0).toUpperCase(), color: 'bg-teal-600' };
    }
  };

  // Get the first few courses
  const displayCourses = courses.slice(0, maxCourses);

  // Handle loading state
  if (loading) {
    return (
      <div className="mb-8 ">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6 bg-white border-0 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="text-center text-gray-500">
            <p>Unable to load your courses. Please try again later.</p>
          </div>
        </Card>
      </div>
    );
  }

  // Handle empty state
  if (courses.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
        <Card className="p-6 bg-white border-0 shadow-sm">
          <div className="text-center text-gray-500">
            <p>You haven't enrolled in any courses yet.</p>
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
        {displayCourses.map((course) => {
          const { icon, color } = getCourseIcon(course);
          return (
            <Card key={course.id} className="p-6 bg-white border-2 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.tagline || course.description || `Created by ${course.creatorName}`}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Ready to start your learning journey
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white ml-4"
                  onClick={() => redirect(`/courses/${toSlug(Number(course.id), course.title)}`)}
                >
                  Start Learning
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
