import { gql } from "@apollo/client";

export const LOGIN_STUDENT = gql`
  mutation LoginStudent($input: LoginInput!) {
    login(input: $input) {
      status
      message
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($input: CreateStudentInput!) {
    createStudent(input: $input) {
      status
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      status
      message
    }
  }
`;
