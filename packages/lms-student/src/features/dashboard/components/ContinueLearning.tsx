'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useRedirectLink } from '@/hooks/useRedirect';
import { CoursesInProgress } from '@lms/shared-types';

interface ContinueLearningProps {
  maxCourses?: number;
  coursesInProgress?: CoursesInProgress[]
}

const ContinueLearning: React.FC<ContinueLearningProps> = ({
  coursesInProgress
}) => {
  const { redirect, toSlug } = useRedirectLink();

  // Helper function to get course color and lesson info based on title
  const getCourseInfo = (course: CoursesInProgress, index: number) => {
    const title = course.title?.toLowerCase() || '';
    const colors = ['bg-blue-500', 'bg-purple-500'];
    const lessons = [
      'Lesson 8: Custom Hooks',
      'Lesson 5: Generics',
      'Lesson 3: Advanced Concepts',
      'Lesson 7: Best Practices',
    ];
    const timeRemaining = ['12 min left', '25 min left', '18 min left', '30 min left'];
    
    return {
      color: colors[index % colors.length],
      lesson: lessons[index % lessons.length] || 'Continue Learning',
      timeLeft: timeRemaining[index % timeRemaining.length] || '15 min left',
    };
  };

  // Fallback if coursesInProgress is missing or not an array
  if (!Array.isArray(coursesInProgress) || coursesInProgress.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
        <Card className="p-6 bg-white border-2 shadow-sm">
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
        {coursesInProgress.slice(0, 2).map((course, index) => {
          const { color, lesson, timeLeft } = getCourseInfo(course, index);
          return (
            <Card key={course.title + course.courseId} className="p-6 bg-white border-2 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-16 h-16 ${color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                    <Play className="w-8 h-8 fill-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 text-lg">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {lesson}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progressPercentage ?? 0}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {timeLeft}
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                  onClick={() => redirect(`/courses/${toSlug(Number(course.courseId), course.title)}`)}
                >
                  Continue
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
