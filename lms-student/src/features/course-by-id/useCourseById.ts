import * as ApolloReact from "@apollo/client/react";
import { COURSE_WITH_LESSON_QUERY, ENROLL_COURSE_MUTATION } from "./query";
import { CourseWithLessons } from "@/types/data";
import { CustomToast } from "@/shared/CustomToast";
interface CourseWithCreatorData {
  course: CourseWithLessons;
}

export const useCourseById = (courseId: number | null, title: string) => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<CourseWithCreatorData>(
    COURSE_WITH_LESSON_QUERY,
    {
      variables: { courseId, title },
      skip: courseId == null,
    }
  );

  // Implement enrollCourse mutation
  const [enrollCourseMutation, { data: enrollData, loading: enrollLoading, error: enrollError }] =
    ApolloReact.useMutation(ENROLL_COURSE_MUTATION);

  const enrollCourse = async (courseId: number) => {
    try {
      await enrollCourseMutation({
        variables: { courseId },
      });
      CustomToast({
        type: "success",
        title: "Course Enrolled",
      })
    } catch (err) {
      throw err;
    }
  };

  return {
    course: data?.course,
    loading,
    error,
    enrollCourse,
    enrollData,
    enrollLoading,
    enrollError,
  };
};