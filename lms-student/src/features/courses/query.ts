import { gql } from "@apollo/client";

export const COURSES_WITH_CREATOR_QUERY = gql`
  query courses {
    courses {
      id
      creatorName
      title
      tagline
      categories
      createdAt
    }
  }
`;