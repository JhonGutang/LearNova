'use client'
import React from "react"
import { useRedirectLink } from "@/hooks/useRedirect"
import { useCourseById } from "./useCourseById"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { mockCourse, communityMessages, suggestions } from "@/mock/Courses";
import CommunityChat from "./components/CommunityChat";
import Suggestions from "./components/Suggestions";
interface CourseByIdProps {
    courseLink: string
}

const CourseById: React.FC<CourseByIdProps> = ({ courseLink }) => {
    const { fromSlug } = useRedirectLink();
    const { id, title } = fromSlug(courseLink);

    const { course, loading, error } = useCourseById(id, title);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8">Error loading course.</div>;

    function AvatarWithImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
        return (
          <Avatar className={className}>
            <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
          </Avatar>
        );
      }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-0 h-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Course Details */}
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center gap-4">
              <AvatarWithImage src={mockCourse.teacher.avatar} alt={mockCourse.teacher.name} />
              <div>
                <CardTitle className="text-2xl font-bold">{course?.title}</CardTitle>
                <div className="text-gray-500 text-sm">by {course?.creatorName}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">{course?.description}</p>
              <div className="text-xs text-gray-400">{mockCourse.teacher.bio}</div>
            </CardContent>
          </Card>
  
          {/* Lessons List */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-72 pr-2">
                <ul className="space-y-3">
                  {course?.lessons.map((lesson, idx) => {
                    // Fallbacks for missing data
                    const title = lesson.title ?? `Lesson ${idx + 1}`;
                    const completed = typeof lesson.completed === "boolean" ? lesson.completed : false;
                    const duration = lesson.duration ?? "Unknown duration";
                    return (
                      <li
                        key={title}
                        className={`flex cursor-pointer items-center justify-between p-3 rounded-lg border transition-colors ${completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${completed ? "bg-green-500" : "bg-gray-300"}`}
                            title={completed ? "Completed" : "Incomplete"}
                          />
                          <span className={`font-medium ${completed ? "text-green-700" : "text-gray-800"}`}>{title}</span>
                        </div>
                        <span className="text-xs text-gray-500">{duration}</span>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
  
        {/* Community/Chat Sidebar */}
        <aside className="w-full md:w-96 flex flex-col gap-4">
          <CommunityChat/>
          <Suggestions/>
        </aside>
      </div>
    );
}


export default CourseById

