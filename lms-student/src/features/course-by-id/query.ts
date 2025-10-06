import { gql } from "@apollo/client";

export const COURSE_WITH_LESSON_QUERY = gql`
  query course($courseId: ID!, $title: String!) {
    course(id: $courseId, title: $title) {
      id
      creatorName
      title
      tagline
      description
      categories
      enrolledCourseId
      lessons {
        id
        title
        description
        progress {
          completedAt
          status
        }
      }
      status
      createdAt
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
