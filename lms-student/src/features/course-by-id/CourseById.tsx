'use client'
import React from "react"
import { useRedirectLink } from "@/hooks/useRedirect"
import { useCourseById } from "./useCourseById"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import { mockCourse } from "@/mock/Courses";
import CommunityChat from "./components/CommunityChat";
import Suggestions from "./components/Suggestions";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/types/data";
interface CourseByIdProps {
    courseLink: string
}

const CourseById: React.FC<CourseByIdProps> = ({ courseLink }) => {
    const { fromSlug, redirect, toSlug } = useRedirectLink();
    const { id, title } = fromSlug(courseLink);
    const { specificPage, loading, error, enrollCourse, startProgress } = useCourseById(id, title);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8">Error loading course.</div>;

    function AvatarWithImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
        return (
          <Avatar className={className}>
            <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
          </Avatar>
        );
      }

    const handleStartProgress = (enrolledCourseId: number, courseLink: string, lesson: Lesson) => {
      startProgress(enrolledCourseId, Number(lesson.id))
      redirect(courseLink + "/"  + toSlug(Number(lesson.id), lesson.title))
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-0 h-full">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Course Details */}
          <Card className="w-full shadow-lg border-0 bg-white">
            <CardHeader className="flex flex-row items-center gap-6 pb-0">
              <AvatarWithImage
                src={specificPage?.course.creator.firstName || mockCourse.teacher.avatar}
                alt={specificPage?.course.creator.firstName || mockCourse.teacher.name}
                className="w-16 h-16 border-2 border-primary shadow"
              />
              <div>
                <CardTitle className="text-3xl font-extrabold text-primary mb-1">{specificPage?.course.title}</CardTitle>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>by</span>
                  <span className="font-semibold text-gray-700">{specificPage?.course?.creator.firstName + " " + specificPage?.course.creator.lastName}</span>
                  <span className="inline-block w-1 h-1 bg-gray-300 rounded-full mx-1" />
                  <span className="text-xs text-gray-400">{specificPage?.course?.categories || "General"}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-sm italic mb-2">&quot;{specificPage?.course?.tagline}&quot;</div>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">{specificPage?.course?.description}</p>
              <div className="flex items-center gap-3 mb-4">
                <AvatarWithImage
                  src={specificPage?.course?.creator.firstName + " " + specificPage?.course?.creator.lastName || mockCourse.teacher.avatar}
                  alt={specificPage?.course?.creator.firstName + " " + specificPage?.course?.creator.lastName || mockCourse.teacher.name}
                  className="w-8 h-8"
                />
                <div>
                  <div className="font-medium text-gray-800">{specificPage?.course?.creator.firstName + " " + specificPage?.course.creator.lastName }</div>
                  <div className="text-xs text-gray-500">{mockCourse.teacher.bio}</div>
                </div>
              </div>
              <Button
                className="w-full py-2 text-lg font-semibold bg-teal-800 hover:bg-teal-700 transition-colors shadow-lg shadow-teal-800/25"
                size="lg"
                onClick={() => enrollCourse(Number(specificPage?.course?.id))}
              >
                {specificPage?.course?.studentEnrollment ? "Unenroll" : "Enroll Now"}
              </Button>
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
                  {specificPage?.course?.lessons.map((lesson, idx) => {
                    // Fallbacks for missing data
                    const title = lesson.title ?? `Lesson ${idx + 1}`;
                    const completed = lesson.progress && lesson.progress.status === "FINISHED";
                    const duration = lesson.progress?.completedAt ?? "Unknown duration";
                    return (
                      <li
                        key={title}
                        className={`flex cursor-pointer items-center justify-between p-3 rounded-lg border transition-colors ${completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
                        onClick={() => handleStartProgress(Number(specificPage?.course.studentEnrollment?.enrolledCourseId), courseLink, lesson)}
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

