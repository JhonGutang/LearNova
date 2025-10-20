import { gql } from "@apollo/client";

export const COURSES_PAGE_QUERY = gql`
  query CoursesPage($category: CourseCategory) {
    coursesPage(category: $category) {
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