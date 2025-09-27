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
  mutation CreateStudent($createStudentInput2: CreateStudentInput!) {
    createStudent(input: $createStudentInput2) {
      status
      message
    }
  }
`;