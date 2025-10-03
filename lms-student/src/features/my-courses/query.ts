import { gql } from "@apollo/client";

export const ENROLLED_COURSES_QUERY = gql`
  query EnrolledCourses {
    enrolledCourses {
      id
      creatorName
      title
      tagline
      description
      status
      categories
      createdAt
    }
  }
`;