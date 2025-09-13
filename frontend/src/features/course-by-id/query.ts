import { gql } from "@apollo/client";

export const GET_COURSE_BY_ID = gql`
    query GetCourseById($id: ID!) {
        course(id: $id) {
            id
            title
            tagline
            description
            categories
            status
            created_at
            updated_at
        }
    }
`;