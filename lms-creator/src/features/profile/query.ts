import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    user {
      ... on CreatorProfile {
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
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($editUserInput: EditableCreatorProfileInput) {
    editUser(input: $editUserInput) {
      status
      message
    }
  }
`;