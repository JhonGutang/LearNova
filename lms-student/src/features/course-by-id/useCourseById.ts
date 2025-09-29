import * as ApolloReact from "@apollo/client/react";
import { COURSE_WITH_CREATOR_QUERY } from "./query";
import { CourseWithCreatorAndLessons } from "@/types/data";

interface CourseWithCreatorData {
  courseWithCreator: CourseWithCreatorAndLessons;
}

export const useCourseById = (courseId: number | null, title: string) => {
  const { data, loading, error } = ApolloReact.useQuery<CourseWithCreatorData>(COURSE_WITH_CREATOR_QUERY, {
    variables: { courseWithCreatorId: courseId, title: title },
    skip: courseId == null,
  });
  return {
    course: data?.courseWithCreator,
    loading,
    error,
  };
};