import { gql } from "@apollo/client";

export const LESSON_PAGES_QUERY = gql`
  query LessonPages($lessonId: Int!) {
    lessonPages(lessonId: $lessonId) {
      id
      lessonId
      pageNumber
      contentJson
      createdAt
    }
  }
`;

export const FINISH_PROGRESS_MUTATION = gql`
  mutation FinishProgress($enrolledCourseId: Int, $lessonId: Int) {
    finishProgress(enrolledCourseId: $enrolledCourseId, lessonId: $lessonId) {
      status
      message
      progressStatus
    }
  }
`;