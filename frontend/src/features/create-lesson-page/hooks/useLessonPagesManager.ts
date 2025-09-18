import { useState, useCallback, useEffect, useMemo } from "react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { useFetchLessonPages, useCreateLessonPage } from "./useLessonPages";

export function useLessonPagesManager(lessonLink: string) {
  // Extract lesson id and title from the link
  const { fromSlug } = useRedirectLink();
  const { id, title } = fromSlug(lessonLink);

  // Fetch lesson pages
  const { lessonPages, loading, error } = useFetchLessonPages(Number(id));

  // Memoize pages: sorted and formatted for sidebar
  const pages = useMemo(() => {
    if (!lessonPages) return [];
    return [...lessonPages]
      .sort((a, b) => a.page_number - b.page_number)
      .map(page => ({
        id: String(page.id),
        name: `Page ${page.page_number}`,
        content: page.content_json,
      }));
  }, [lessonPages]);

  // Track the currently selected page id
  const [activePageId, setActivePageId] = useState<string | undefined>(undefined);

  // Ensure activePageId is always valid (defaults to first page)
  useEffect(() => {
    if (pages.length === 0) return;
    const isActiveValid = pages.some(p => p.id === activePageId);
    if (!activePageId || !isActiveValid) {
      setActivePageId(pages[0].id);
    }
  }, [pages, activePageId]);

  // Find the active page object
  const activePage = useMemo(
    () => pages.find(page => page.id === activePageId),
    [pages, activePageId]
  );

  // 1-based index of the current page
  const currentPageIndex = useMemo(() => {
    if (!activePage) return undefined;
    return pages.findIndex(page => page.id === activePage.id) + 1;
  }, [pages, activePage]);

  const totalPages = pages.length;

  // For creating new lesson pages
  const {
    createLessonPage,
    loading: creating,
    error: createError,
  } = useCreateLessonPage();

  // Compute the next page number
  const nextPageNumber = useMemo(() => {
    if (pages.length === 0) return 1;
    return Math.max(...pages.map(p => {
      // Extract page number from name, fallback to 0 if parse fails
      const num = parseInt(p.name.replace('Page ', ''), 10);
      return isNaN(num) ? 0 : num;
    })) + 1;
  }, [pages]);

  // Add a new page and select it
  const handleAddPage = useCallback(async () => {
    if (!id) return;
    const newPage = await createLessonPage({
      lessonId: Number(id),
      pageNumber: nextPageNumber,
      contentJson: '',
    });
    if (newPage) {
      setActivePageId(String(newPage.id));
    }
  }, [id, createLessonPage, nextPageNumber]);

  // Select a page by id
  const handleSelectPage = useCallback((id: string) => {
    setActivePageId(id);
  }, []);

  // Save all pages (not implemented)
  const saveAllPages = useCallback(() => {
    alert('Save all pages functionality not implemented yet.');
  }, []);

  // Save current page (creates a new page with given content)
  const saveCurrentPage = useCallback(async (content: string) => {
    if (!id) return;
    await createLessonPage({
      lessonId: Number(id),
      pageNumber: nextPageNumber,
      contentJson: content,
    });
  }, [id, createLessonPage, nextPageNumber]);

  // Debug: log fetched lesson pages
  useEffect(() => {
    if (!loading && !error) {
      console.log('Fetched lesson pages:', lessonPages);
    }
  }, [lessonPages, loading, error]);

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
    saveCurrentPage,
    nextPageNumber,
    creating,
    createError,
  };
}
