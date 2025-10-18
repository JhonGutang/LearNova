import { gql } from "@apollo/client";

export const COURSES_PAGE_QUERY = gql`
  query CoursesPage {
    coursesPage {
      allCourses {
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
      featuredCourses {
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
      enrollCourse {
        id
        title
        tagline
        description
        creator {
          firstName
          lastName
        }
        createdAt
        studentEnrollment {
          enrolledCourseId
          enrolledAt
          progress
        }
      }
      student {
        id
        firstName
        lastName
        level
        exp
      }
    }
  }
`;