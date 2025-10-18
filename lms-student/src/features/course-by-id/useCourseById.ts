import * as ApolloReact from "@apollo/client/react";
import { SPECIFIC_PAGE_QUERY, ENROLL_COURSE_MUTATION, START_PROGRESS_MUTATION } from "./query";
import { CustomToast } from "@/shared/CustomToast";
import { SpecificPageData } from "@/types/data";

export interface BaseResponse {
  status: "SUCCESS" | "FAILED"
  progressStatus: "IN_PROGRESS" | "STARTED" | "FINISHED" | "FAILED";
  message: string
}

interface StartProgressResponse {
  startProgress: BaseResponse
}

export const useCourseById = (courseId: number | null, title: string) => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<SpecificPageData>(
    SPECIFIC_PAGE_QUERY,
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
    specificPage: data?.specificCoursePage,
    loading,
    error,
    enrollCourse,
    enrollData,
    enrollLoading,
    enrollError,
    startProgress
  };
};