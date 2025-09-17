import React from "react";
import CreateLessonPage from "@/src/features/create-lesson-page/CreateLessonPage";

interface LessonPageProps {
  params: {
    lessonTitle: string;
  };
}

const LessonPage = ({ params }: LessonPageProps) => {
  const { lessonTitle } = params;
  return (
    <CreateLessonPage lessonLink={lessonTitle} />
  );
};

export default LessonPage;
