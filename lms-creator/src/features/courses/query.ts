import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query courses {
    courses {
      id
      title
      tagline
      categories
      createdAt
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
