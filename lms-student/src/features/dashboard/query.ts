import { gql } from '@apollo/client';

export const USER_DETAILS_QUERY = gql`
  query StudentDetails {
    studentDetails {
      id
      firstName
      lastName
      level
      exp
      coursesInProgress {
        courseId
        title
        tagline
        progressPercentage
      }
      courseRecommendations {
        courseId
        title
        tagline
        rate
      }
    }
  }
`;