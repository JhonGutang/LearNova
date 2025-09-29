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
                  {mockCourse.lessons.map((lesson, idx) => (
                    <li
                      key={lesson.title}
                      className={`flex cursor-pointer items-center justify-between p-3 rounded-lg border transition-colors ${lesson.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${lesson.completed ? "bg-green-500" : "bg-gray-300"}`}
                          title={lesson.completed ? "Completed" : "Incomplete"}
                        />
                        <span className={`font-medium ${lesson.completed ? "text-green-700" : "text-gray-800"}`}>{lesson.title}</span>
                      </div>
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
  
        {/* Community/Chat Sidebar */}
        <aside className="w-full md:w-96 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community</CardTitle>
              <div className="text-xs text-gray-400">Chat with fellow students</div>
            </CardHeader>
            <CardContent className="flex flex-col p-0">
              <ScrollArea className="px-4 py-2 max-h-64">
                <ul className="space-y-4">
                  {communityMessages.map((msg, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AvatarWithImage src={msg.user.avatar} alt={msg.user.name} className="w-8 h-8" />
                      <div>
                        <div className="font-semibold text-sm">{msg.user.name}</div>
                        <div className="text-gray-700 text-sm">{msg.message}</div>
                        <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <div className="border-t p-4 bg-gray-50 flex gap-2">
                <Input placeholder="Type your message..." disabled />
                <Button disabled>Send</Button>
              </div>
            </CardContent>
          </Card>
          {/* Suggestions Carousel */}
          <div className="mt-2">
            <div className="font-semibold text-sm mb-2 ml-1 text-gray-700">Suggestions for you</div>
            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex gap-3 min-w-full">
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    className="min-w-[200px] max-w-[220px] bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-start gap-2 shrink-0"
                  >
                    <img src={s.icon} alt="" className="w-7 h-7 mb-1" />
                    <div className="font-medium text-gray-800 text-sm">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
}


export default CourseById

