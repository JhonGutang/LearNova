import * as ApolloReact from "@apollo/client/react";
import { LESSON_PAGES_QUERY, CREATE_OR_UPDATE_LESSON_PAGE_MUTATION } from "../query";

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


interface CreateLessonPageInput {
  lessonId: number;
  pageNumber: number;
  contentJson: string;
}

interface CreateLessonPageData {
  createOrUpdateLessonPage: LessonPage;
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

export function useUpsertLessonPage() {
  const [upsertLessonPageMutation, { data, loading, error }] = ApolloReact.useMutation<CreateLessonPageData, { input: CreateLessonPageInput }>(
    CREATE_OR_UPDATE_LESSON_PAGE_MUTATION
  );

  const upsertLessonPage = async (input: CreateLessonPageInput) => {
    const response = await upsertLessonPageMutation({ variables: { input } });
    return response.data?.createOrUpdateLessonPage;
  };

  return {
    upsertLessonPage,
    data: data?.createOrUpdateLessonPage,
    loading,
    error,
  };
}
