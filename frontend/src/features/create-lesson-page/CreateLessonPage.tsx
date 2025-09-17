'use client'

import React, { useState, useCallback } from "react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { Sidebar } from "./components/Sidebar";
import dynamic from 'next/dynamic'


interface CreateLessonPageProps {
  lessonLink: string;
}

type Page = {
  id: string;
  name: string;
};
const TiptapEditor = dynamic(() => import('./components/Tiptap'), { ssr: false })

const CreateLessonPage: React.FC<CreateLessonPageProps> = ({ lessonLink }) => {
  const { fromSlug } = useRedirectLink();
  const { title } = fromSlug(lessonLink);

  // Pages state: array of pages, each with id and name
  const [pages, setPages] = useState<Page[]>([
    { id: "page-1", name: "Page 1" },
    { id: "page-2", name: "Page 2" },
  ]);
  
  // Track the currently selected page by id
  const [activePageId, setActivePageId] = useState<string>(pages[0].id);

  // Add a new page
  const handleAddPage = useCallback(() => {
    const newId = `page-${pages.length + 1}`;
    const newPage = { id: newId, name: `Page ${pages.length + 1}` };
    setPages(prev => [...prev, newPage]);
    setActivePageId(newId);
  }, [pages.length]);

  // Select a page
  const handleSelectPage = useCallback((id: string) => {
    setActivePageId(id);
  }, []);

  // Save all pages content
  const saveAllPages = useCallback(() => {
    console.log('Save all pages functionality');
    // TODO: Implement actual save functionality for all pages
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        pages={pages}
        activePageId={activePageId}
        onAddPage={handleAddPage}
        onSelectPage={handleSelectPage}
      />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {pages.find(page => page.id === activePageId)?.name || 'Unknown Page'}
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
        
        {/* Lesson content area */}
        <TiptapEditor/>
      </main>
    </div>
  );
};

export default CreateLessonPage;
