import { gql } from "@apollo/client";

export const GET_COURSE_BY_ID = gql`
  query Course($courseId: Int, $title: String) {
    course(courseId: $courseId, title: $title) {
      id
      title
      tagline
      description
      status
      lessons {
        id
        title
        description
      }
      totalNumberOfParticipants
      totalNumberOfLessons
      categories
    }
  }
`;

export const PUBLISH_COURSE = gql`
  mutation PublishCourse($courseId: Int!) {
    publishCourse(courseId: $courseId) {
      status
      message
    }
  }
`;