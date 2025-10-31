import { gql } from "@apollo/client";

export const GET_CREATOR_COURSES = gql`
  query CreatorCourses {
    creatorCourses {
      id
      title
      tagline
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CourseInput!) {
    createCourse(input: $input) {
      id
      title
      tagline
      description
      categories
      status
      created_at
      updated_at
    }
  }
`;
