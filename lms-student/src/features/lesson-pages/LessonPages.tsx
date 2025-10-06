"use client";
import { useLessonPages } from "./useLessonPages";
import { useRedirectLink } from "@/hooks/useRedirect";
import FallbackMessage from "@/shared/FallbackMessage";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import Navigation from "./components/Navigation";
import { redirect } from "next/dist/server/api-utils";

interface LessonPagesProps {
  lessonLink: string;
  courseLink: string;
}

const LessonPages: React.FC<LessonPagesProps> = ({ lessonLink, courseLink }) => {
  const { fromSlug, redirect } = useRedirectLink();
  const { id } = fromSlug(lessonLink);
  const { lessonPages, loading, error, finishProgress } = useLessonPages(id);
  const [currentPage, setCurrentPage] = useState(0);

  if (!id) {
    return <FallbackMessage message="Lesson Not Found" />;
  }
 
  if (loading) {
    return <FallbackMessage message="Loading lesson pages..." />;
  }
 
  if (error) {
    return <div>Error loading lesson pages: {error.message}</div>;
  }
 
  if (!lessonPages || (Array.isArray(lessonPages) && lessonPages.length === 0)) {
    return <FallbackMessage message="No Pages Found" />;
  }

  const pagesArray = Array.isArray(lessonPages) ? lessonPages : [lessonPages];
  const totalPages = pagesArray.length;

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handleFinishLesson = () => {
    finishProgress(id)
    setTimeout(() => {
      redirect("/" + courseLink)
    }, 1500);
  }

  const page = pagesArray[currentPage];

  if (!page) {
    return <FallbackMessage message="Page not found" isError={true}/>;
  }

  return (
    <div>
      <div key={page.id || currentPage} className="p-10">
        <div className="border-2 border-teal-500 min-h-[70vh] p-10 rounded-2xl ">
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(page.contentJson || ""),
            }}
          />
        </div>
      </div>
     <Navigation handleFinishLesson={handleFinishLesson} currentPage={currentPage} goToNextPage={goToNextPage} goToPrevPage={goToPrevPage} totalPages={totalPages}/>
    </div>
  );
};

export default LessonPages;
