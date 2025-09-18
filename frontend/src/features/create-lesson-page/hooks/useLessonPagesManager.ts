import { useState, useCallback, useEffect, useMemo } from "react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { useFetchLessonPages, useUpsertLessonPage, useDeleteLessonPage } from "./useLessonPages";

type SaveStatus = 'idle' | 'debouncing' | 'saving' | 'saved';

export function useLessonPagesManager(lessonLink: string) {
  // Extract lesson id and title from the link
  const { fromSlug } = useRedirectLink();
  const { id, title } = fromSlug(lessonLink);

  // Fetch lesson pages
  const { lessonPages, loading, error, refetch } = useFetchLessonPages(Number(id));
  // Memoize pages: sorted and formatted for sidebar
  const pages = useMemo(() => {
    if (!lessonPages) return [];
    return [...lessonPages]
      .sort((a, b) => a.page_number - b.page_number)
      .map(page => ({
        id: String(page.id),
        name: `Page ${page.page_number}`,
        content: page.content_json,
        pageNumber: page.page_number, // Keep the actual page number
      }));
  }, [lessonPages]);

  // Track the currently selected page id
  const [activePageId, setActivePageId] = useState<string | undefined>(undefined);
  
  // Track save status for auto-save functionality
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

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

  // For creating or updating lesson pages
  const {
    upsertLessonPage,
    loading: creating,
    error: createError,
  } = useUpsertLessonPage();

  // For deleting lesson pages
  const {
    deleteLessonPage,
    loading: deleting,
    error: deleteError,
  } = useDeleteLessonPage();

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
    const newPage = await upsertLessonPage({
      lessonId: Number(id),
      pageNumber: nextPageNumber,
      contentJson: '',
    });
    if (newPage) {
      setActivePageId(String(newPage.id));
      refetch();
    }
  }, [id, upsertLessonPage, nextPageNumber, refetch]);

  // Select a page by id
  const handleSelectPage = useCallback((id: string) => {
    setActivePageId(id);
  }, []);

  // Delete a page by id
  const handleDeletePage = useCallback(async (id: string): Promise<boolean> => {
    const success = await deleteLessonPage(Number(id));
    if (success) {
      // If we deleted the currently active page, select the first available page
      if (activePageId === id) {
        const remainingPages = pages.filter(page => page.id !== id);
        if (remainingPages.length > 0) {
          setActivePageId(remainingPages[0].id);
        } else {
          setActivePageId(undefined);
        }
      }
      // Refetch to update the list
      refetch();
    }
    return success || false;
  }, [deleteLessonPage, activePageId, pages, refetch]);

  // Save all pages (not implemented)
  const saveAllPages = useCallback(() => {
    alert('Save all pages functionality not implemented yet.');
  }, []);

  // Handle debounce start
  const handleDebounceStart = useCallback(() => {
    console.log('Debounce started - setting status to debouncing');
    setSaveStatus('debouncing');
  }, []);

  // Save current page (creates or updates a page with given content)
  const saveCurrentPage = useCallback(async (content: string) => {
    if (!id) return;
    
    console.log('Starting actual save - setting status to saving');
    setSaveStatus('saving');
    
    try {
      let pageNumber: number;
      if (activePage) {
        console.log('this is active page', activePage)
        pageNumber = activePage.pageNumber;
      } else {
        pageNumber = nextPageNumber;
      }

      console.log(pageNumber)
      
      console.log('DEBUG - About to send payload:', {
        lessonId: Number(id),
        pageNumber,
        contentJson: content,
      });
      
      await upsertLessonPage({
        lessonId: Number(id),
        pageNumber,
        contentJson: content,
      });
      
      console.log('Save completed - setting status to saved');
      setSaveStatus('saved');

      setTimeout(() => {
        console.log('Auto-hiding saved indicator - setting status to idle');
        setSaveStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.log('Save failed - setting status to idle');
      setSaveStatus('idle');
      throw error;
    }
  }, [id, upsertLessonPage, activePage, nextPageNumber]);

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
    handleDeletePage,
    saveCurrentPage,
    nextPageNumber,
    creating,
    createError,
    deleting,
    deleteError,
    saveStatus,
    handleDebounceStart,
  };
}
