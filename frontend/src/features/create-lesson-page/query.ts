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

export const CREATE_LESSON_PAGE_MUTATION = gql`
  mutation CreateLessonPage($input: CreateLessonPageInput!) {
    createLessonPage(input: $input) {
      id
      lesson_id
      page_number
      content_json
      created_at
      updated_at
    }
  }
`;