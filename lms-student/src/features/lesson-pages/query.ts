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