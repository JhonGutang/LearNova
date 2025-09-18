import { gql } from "@apollo/client";

export const LESSON_PAGES_QUERY = gql`
  query LessonPages($lessonId: Int!) {
    lessonPages(lessonId: $lessonId) {
      id
      lesson_id
      page_number
      content_json
      created_at
      updated_at
    }
  }
`;