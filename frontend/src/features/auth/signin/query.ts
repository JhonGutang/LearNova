import { gql } from "@apollo/client";

export const AUTHENTICATE_CREATOR = gql`
  mutation AuthenticateCreator($input: AuthenticateCreatorInput!) {
    authenticateCreator(input: $input) {
      ... on Creator {
        id
        first_name
        last_name
        middle_name
        password
        contact_information {
          id
          creator_id
          phone
          email
          address
        }
        created_at
        updated_at
      }
      ... on AuthError {
        message
      }
    }
  }
`;