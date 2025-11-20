'use client'

import React, { useCallback, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import dynamic from 'next/dynamic'
import { useLessonPagesManager } from "./hooks/useLessonPagesManager";
import FallbackMessage from "./components/FallbackMessage";

interface CreateLessonPageProps {
  lessonLink: string;
}

type Page = {
  id: string;
  name: string;
  content: string;
  pageNumber: number;
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
    handleDeletePage,
    saveCurrentPage,
    creating,
    createError,
    deleting,
    deleteError,
    saveStatus,
    handleDebounceStart,
  } = useLessonPagesManager(lessonLink);

  // Ref to hold the editor instance
  const editorRef = useRef<any>(null);

  // Auto-save callback
  const handleAutoSave = useCallback((content: string) => {
    saveCurrentPage(content);
  }, [saveCurrentPage, activePage, activePageId]);

  // Handler to save current page
  const handleSaveCurrentPage = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.getHTML();
      saveCurrentPage(content);
    }
  }, [saveCurrentPage]);

  if (loading) return <div className="p-8">Loading lesson pages...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading lesson pages.</div>;

  return (
    <>
      {pages.length === 0 ? (
        <FallbackMessage addPage={handleAddPage} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar 
            pages={pages}
            activePageId={activePageId || ''}
            onAddPage={handleAddPage}
            onSelectPage={handleSelectPage}
            onDeletePage={handleDeletePage}
            deleting={deleting}
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
                {(saveStatus === 'debouncing' || saveStatus === 'saving') && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    <span>Saving...</span>
                  </div>
                )}

                {saveStatus === 'saved' && (
                  <div className="flex items-center gap-1 text-sm text-green-600 animate-fade-in">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                    <span>Saved</span>
                  </div>
                )}
                <button 
                  onClick={handleSaveCurrentPage}
                  className="px-3 py-1 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                  disabled={creating}
                >
                  {creating ? 'Saving...' : 'Save Current Page'}
                </button>
                <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">Share</button>
                <img
                  src="/avatar-placeholder.png"
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              </div>
            </div>
            <TiptapEditor 
              content={activePage?.content || ''}
              editorRef={editorRef}
              onAutoSave={handleAutoSave}
              onDebounceStart={handleDebounceStart}
            />
            {createError && <div className="text-red-500 mt-2">Error saving page.</div>}
            {deleteError && <div className="text-red-500 mt-2">Error deleting page.</div>}
          </main>
        </div>
      )}
    </>
  );
}

export default CreateLessonPage;
