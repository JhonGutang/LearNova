import { gql } from "@apollo/client";

export const CREATE_CREATOR = gql`
  mutation CreateCreator($input: CreateCreatorProfileInput!) {
    createCreator(input: $input) {
      id
      user_id
      first_name
      last_name
      middle_name
      email
      phone
      address
      created_at
      updated_at
    }
  }
`;
