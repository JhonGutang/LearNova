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
        isFavorite
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

export const SEARCH_COURSE_QUERY = gql`
  query SearchCourse($title: String) {
    searchCourse(title: $title) {
      id
      title
      tagline
      description
      creator {
        firstName
        lastName
      }
      createdAt
      isFavorite
      studentEnrollment {
        enrolledCourseId
        enrolledAt
        progress
      }
    }
  }
`;

export const ADD_FAVORITE_COURSE_MUTATION = gql`
  mutation AddFavoriteCourse($courseId: Int!) {
    addFavoriteCourse(courseId: $courseId) {
      status
      message
    }
  }
`;

export const TOGGLE_FAVORITE_COURSE_MUTATION = gql`
  mutation ToggleFavoriteCourse($courseId: Int!) {
    toggleFavoriteCourse(courseId: $courseId) {
      status
      message
      isFavorite
    }
  }
`;