import * as ApolloReact from "@apollo/client/react";
import { LESSON_PAGES_QUERY } from "./query";
import { LessonPages as LessonPagesType } from "@/types/data";

interface LessonPages {
    lessonPages: LessonPagesType;
}

export const useLessonPages = (id: number | null) => {
    const { data, loading, error } = ApolloReact.useQuery<LessonPages>(
      LESSON_PAGES_QUERY,
      {
        variables: { lessonId: id },
        skip: id === null || id <= 0, // prevent invalid requests
      }
    );
  
    return {
      lessonPages: data?.lessonPages,
      loading,
      error,
    };
  };
  