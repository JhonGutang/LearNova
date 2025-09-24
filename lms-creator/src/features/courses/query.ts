import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query CoursesByCreator {
    coursesByCreator {
      id
      creator_id
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
