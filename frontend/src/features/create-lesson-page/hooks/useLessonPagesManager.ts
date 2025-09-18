import { useState, useCallback, useEffect, useMemo } from "react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { useFetchLessonPages } from "./useFetchLessonPages";

export function useLessonPagesManager(lessonLink: string) {
  const { fromSlug } = useRedirectLink();
  const { id, title } = fromSlug(lessonLink);

  // Fetch lesson pages
  const { lessonPages, loading, error } = useFetchLessonPages(Number(id));
  useEffect(() => {
    if (!loading && !error) {
      console.log('Fetched lesson pages:', lessonPages);
    }
  }, [lessonPages, loading, error]);

  // Map lessonPages to sidebar format and order by page_number
  const pages = useMemo(() => (
    (lessonPages || [])
      .slice()
      .sort((a, b) => a.page_number - b.page_number)
      .map((page) => ({
        id: String(page.id),
        name: `Page ${page.page_number}`,
        content: page.content_json,
      }))
  ), [lessonPages]);

  // Track the currently selected page by id (default to first page if available)
  const [activePageId, setActivePageId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (pages.length > 0 && (activePageId === undefined || !pages.some(p => p.id === activePageId))) {
      setActivePageId(pages[0].id);
    }
  }, [pages, activePageId]);

  // Find the active page object
  const activePage = pages.find(page => page.id === activePageId);

  // Find the current page index (1-based)
  const currentPageIndex = activePage
    ? pages.findIndex(page => page.id === activePage.id) + 1
    : undefined;
  const totalPages = pages.length;

  // Add a new page (TODO: implement backend mutation)
  const handleAddPage = useCallback(() => {
    // This should trigger a backend mutation to add a new page
    alert('Add page functionality not implemented yet.');
  }, []);

  // Select a page
  const handleSelectPage = useCallback((id: string) => {
    setActivePageId(id);
  }, []);

  // Save all pages content (TODO: implement backend save)
  const saveAllPages = useCallback(() => {
    alert('Save all pages functionality not implemented yet.');
  }, []);

  return {
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
  };
}
