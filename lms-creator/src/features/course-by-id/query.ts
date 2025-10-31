import { gql } from "@apollo/client";

export const GET_COURSE_BY_ID = gql`
  query Course($courseId: Int, $title: String) {
    course(courseId: $courseId, title: $title) {
      id
      title
      tagline
      description
      lessons {
        id
        title
        description
      }
      categories
    }
  }
`;