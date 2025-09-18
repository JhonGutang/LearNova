import React from "react";
import CreateLessonPage from "@/src/features/create-lesson-page/CreateLessonPage";

interface LessonPageProps {
  params: {
    lessonTitle: string;
  };
}

const LessonPage = async ({ params }: LessonPageProps) => {
  const { lessonTitle } = await Promise.resolve(params);
  return (
    <CreateLessonPage lessonLink={lessonTitle} />
  );
};

export default LessonPage;
