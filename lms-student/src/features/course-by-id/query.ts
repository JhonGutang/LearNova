import { gql } from "@apollo/client";

export const COURSE_WITH_CREATOR_QUERY = gql`
  query CourseWithCreator($courseWithCreatorId: ID!, $title: String!) {
    courseWithCreator(id: $courseWithCreatorId, title: $title) {
      id
      creatorName
      creatorMiddleName
      title
      tagline
      description
      categories
      status
      createdAt
      updatedAt
    }
  }
`;