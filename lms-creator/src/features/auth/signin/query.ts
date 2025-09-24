import { gql } from "@apollo/client";

export const AUTHENTICATE_CREATOR = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      message
      status
    }
  }
`;
