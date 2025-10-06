import * as ApolloReact from "@apollo/client/react";
import { FINISH_PROGRESS_MUTATION, LESSON_PAGES_QUERY } from "./query";
import { LessonPages as LessonPagesType } from "@/types/data";
import { CustomToast } from "@/shared/CustomToast";
import { BaseResponse } from "../course-by-id/useCourseById";

interface LessonPages {
    lessonPages: LessonPagesType;
}
interface FinishProgressResponse{
  finishProgress: BaseResponse
}

export const useLessonPages = (id: number | null) => {
  const [finishProgressMutation, { data: finishProgressData, loading: finishProgressLoading, error: finishProgressError }] =
  ApolloReact.useMutation<FinishProgressResponse>(FINISH_PROGRESS_MUTATION);
    const { data, loading, error } = ApolloReact.useQuery<LessonPages>(
      LESSON_PAGES_QUERY,
      {
        variables: { lessonId: id },
        skip: id === null || id <= 0, // prevent invalid requests
      }
    );

    const finishProgress = async (enrolledCourseId: number, lessonId: number) => {
      try {
        const response = await finishProgressMutation({
          variables: { enrolledCourseId, lessonId },
        });
  
        if (response.data?.finishProgress.progressStatus === "FINISHED") {
          CustomToast({
            type: "success",
            title: "Progress Finished",
          });
        } else {
          CustomToast({
            type: "error",
            title: response.data?.finishProgress.message || "Failed to finish progress",
          });
        }
      } catch (err) {
        CustomToast({
          type: "error",
          title: "Failed to finish progress",
        });
        throw err;
      }
    }
  
    return {
      lessonPages: data?.lessonPages,
      loading,
      error,
      finishProgress
    };
  };
  