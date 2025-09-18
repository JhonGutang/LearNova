'use client'

import React, { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import dynamic from 'next/dynamic'
import { useLessonPagesManager } from "./hooks/useLessonPagesManager";

interface CreateLessonPageProps {
  lessonLink: string;
}

type Page = {
  id: string;
  name: string;
  content: string;
};
const TiptapEditor = dynamic(() => import('./components/Tiptap'), { ssr: false })

const CreateLessonPage: React.FC<CreateLessonPageProps> = ({ lessonLink }) => {
  const {
    title,
    pages,
    activePageId,
    activePage,
    currentPageIndex,
    totalPages,
    loading,
    error,
    handleAddPage,
    handleSelectPage,
    saveAllPages,
  } = useLessonPagesManager(lessonLink);

  if (loading) return <div className="p-8">Loading lesson pages...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading lesson pages.</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        pages={pages}
        activePageId={activePageId || ''}
        onAddPage={handleAddPage}
        onSelectPage={handleSelectPage}
      />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {currentPageIndex && totalPages
                ? `Page ${currentPageIndex} / ${totalPages}`
                : 'Unknown Page'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={saveAllPages}
              className="px-3 py-1 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
            >
              Save All Pages
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">Share</button>
            <img
              src="/avatar-placeholder.png"
              alt="User"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          </div>
        </div>

        <TiptapEditor content={activePage?.content || ''}/>
      </main>
    </div>
  );
};

export default CreateLessonPage;
