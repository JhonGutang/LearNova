import * as ApolloReact from "@apollo/client/react";
import { COURSE_WITH_LESSON_QUERY, ENROLL_COURSE_MUTATION, START_PROGRESS_MUTATION } from "./query";
import { CourseWithLessons } from "@/types/data";
import { CustomToast } from "@/shared/CustomToast";
interface CourseWithCreatorData {
  course: CourseWithLessons;
}

export interface BaseResponse {
  status: "SUCCESS" | "FAILED"
  progressStatus: "IN_PROGRESS" | "STARTED" | "FINISHED" | "FAILED";
  message: string
}

interface StartProgressResponse {
  startProgress: BaseResponse
}

export const useCourseById = (courseId: number | null, title: string) => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<CourseWithCreatorData>(
    COURSE_WITH_LESSON_QUERY,
    {
      variables: { courseId, title },
      skip: courseId == null,
    }
  );
  const [enrollCourseMutation, { data: enrollData, loading: enrollLoading, error: enrollError }] =
    ApolloReact.useMutation(ENROLL_COURSE_MUTATION);
  const [startProgressMutation, { data: startProgressData, loading: startProgressLoading, error: startProgressError }] =
    ApolloReact.useMutation<StartProgressResponse>(START_PROGRESS_MUTATION);


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

  const startProgress = async (enrolledCourseId: number, lessonId: number) => {
    try {
      const response = await startProgressMutation({
        variables: { enrolledCourseId, lessonId },
      });

      if(response.data?.startProgress.progressStatus === "IN_PROGRESS") {
        return
      }
      CustomToast({
        type: "success",
        title: "Progress Started",
      });
    } catch (err) {
      CustomToast({
        type: "error",
        title: "Failed to start progress",
      });
      throw err;
    }
  }

  

  return {
    course: data?.course,
    loading,
    error,
    enrollCourse,
    enrollData,
    enrollLoading,
    enrollError,
    startProgress
  };
};