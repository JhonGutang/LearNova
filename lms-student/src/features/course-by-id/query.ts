import { gql } from "@apollo/client";

export const COURSE_WITH_LESSON_QUERY = gql`
  query course($courseId: ID!, $title: String!) {
    course(id: $courseId, title: $title) {
      id
      creatorName
      title
      tagline
      description
      categories
      lessons {
        id
        title
        description
      }
      status
      createdAt
    }
  }
`;