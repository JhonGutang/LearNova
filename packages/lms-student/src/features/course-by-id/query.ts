import { gql } from "@apollo/client";

export const SPECIFIC_PAGE_QUERY = gql`
  query SpecificCoursePage($courseId: Int, $title: String) {
    specificCoursePage(courseId: $courseId, title: $title) {
      student {
        firstName
        lastName
      }
      course {
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
        lessons {
          id
          title
          description
          progress {
            id
            enrolledCourseId
            lessonId
            status
            completedAt
          }
        }
      }
    }
  }
`;

export const ENROLL_COURSE_MUTATION = gql`
  mutation EnrollCourse($courseId: Int!) {
    enrollCourse(courseId: $courseId) {
      status
      message
    }
  }
`;

export const START_PROGRESS_MUTATION = gql`
  mutation StartProgress($enrolledCourseId: Int, $lessonId: Int) {
    startProgress(enrolledCourseId: $enrolledCourseId, lessonId: $lessonId) {
      status
      progressStatus
      message
    }
  }
`;
