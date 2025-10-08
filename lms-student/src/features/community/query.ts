import { gql } from "@apollo/client";

const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    owner {
      id
      firstName
      lastName
    }
    topic
    content
    createdAt
    hasLiked
  }
`;

export const POSTS_QUERY = gql`
  ${POST_FRAGMENT}
  query Posts {
    posts {
      ...PostFragment
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  ${POST_FRAGMENT}
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      ...PostFragment
    }
  }
`;

export const REACT_POST_MUTATION = gql`
  mutation ReactPost($input: ReactPostInput!) {
    reactPost(input: $input) {
      message
      type
    }
  }
`;
