import { gql } from "@apollo/client";

export const CREATE_CREATOR = gql`
  mutation CreateCreator($input: CreateCreatorInput!) {
    createCreator(input: $input) {
      id
      first_name
      last_name
      middle_name
      password
      contact_information {
        phone
        email
        address
      }
      created_at
      updated_at
    }
  }
`;