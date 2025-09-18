import * as ApolloReact from "@apollo/client/react";
import { LESSON_PAGES_QUERY } from "../query";

// Define the type for a lesson page (based on query.ts)
export interface LessonPage {
  id: number;
  lesson_id: number;
  page_number: number;
  content_json: string;
  created_at: string;
  updated_at: string;
}

interface LessonPagesData {
  lessonPages: LessonPage[];
}

export function useFetchLessonPages(lessonId: number) {
  const { data, loading, error, refetch } = ApolloReact.useQuery<LessonPagesData>(LESSON_PAGES_QUERY, {
    variables: { lessonId },
    skip: !lessonId,
  });

  return {
    lessonPages: data?.lessonPages ?? [],
    loading,
    error,
    refetch,
  };
}
