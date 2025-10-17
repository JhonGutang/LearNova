import { gql } from "@apollo/client";

export const COURSES_WITH_CREATOR_QUERY = gql`
  query courses {
    courses {
      id
      title
      tagline
      description
      creator {
        firstName
        lastName
      }
      createdAt
    }
  }
`;
