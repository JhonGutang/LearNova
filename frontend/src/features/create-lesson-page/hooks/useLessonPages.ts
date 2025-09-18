import * as ApolloReact from "@apollo/client/react";
import { LESSON_PAGES_QUERY, CREATE_LESSON_PAGE_MUTATION } from "../query";

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
  createLessonPage: LessonPage;
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

export function useCreateLessonPage() {
  const [createLessonPageMutation, { data, loading, error }] = ApolloReact.useMutation<CreateLessonPageData, { input: CreateLessonPageInput }>(
    CREATE_LESSON_PAGE_MUTATION
  );

  const createLessonPage = async (input: CreateLessonPageInput) => {
    const response = await createLessonPageMutation({ variables: { input } });
    return response.data?.createLessonPage;
  };

  return {
    createLessonPage,
    data: data?.createLessonPage,
    loading,
    error,
  };
}
