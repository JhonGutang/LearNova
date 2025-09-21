import { gql } from "@apollo/client";

export const AUTHENTICATE_CREATOR = gql`
  mutation AuthenticateCreator($input: AuthenticateCreatorInput!) {
    authenticateCreator(input: $input) {
      message
      status
    }
  }
`;
