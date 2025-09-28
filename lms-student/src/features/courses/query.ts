import { gql } from "@apollo/client";

export const COURSES_WITH_CREATOR_QUERY = gql`
  query CoursesWithCreator {
    coursesWithCreator {
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