import * as ApolloReact from "@apollo/client/react";
import { COURSE_WITH_LESSON_QUERY } from "./query";
import { CourseWithLessons } from "@/types/data";

interface CourseWithCreatorData {
  course: CourseWithLessons;
}

export const useCourseById = (courseId: number | null, title: string) => {
  console.log(courseId)
  const { data, loading, error } = ApolloReact.useQuery<CourseWithCreatorData>(COURSE_WITH_LESSON_QUERY, {
    variables: { courseId: courseId, title: title },
    skip: courseId == null,
  });
  return {
    course: data?.course,
    loading,
    error,
  };
};