import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
  mutation createLesson($input: LessonInput!) {
    createLesson(input: $input) {
      course_id
      title
      description
    }
  }
`;
