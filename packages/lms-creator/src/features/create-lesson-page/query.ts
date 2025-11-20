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

export const CREATE_OR_UPDATE_LESSON_PAGE_MUTATION = gql`
  mutation CreateOrUpdateLessonPage($input: CreateOrUpdateLessonPageInput!) {
    createOrUpdateLessonPage(input: $input) {
      id
      lessonId
      pageNumber
      contentJson
      createdAt
    }
  }
`;

export const DELETE_LESSON_PAGE_MUTATION = gql`
  mutation DeleteLessonPage($id: Int!) {
    deleteLessonPage(id: $id)
  }
`;