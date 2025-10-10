import { gql } from "@apollo/client";

export const CREATE_CREATOR = gql`
  mutation CreateCreator($input: CreateCreatorProfileInput!) {
    createCreator(input: $input) {
      id
      userId
      firstName
      lastName
      middleName
      email
      phone
      address
      createdAt
    }
  }
`;
