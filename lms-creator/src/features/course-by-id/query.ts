import { gql } from "@apollo/client";

export const GET_COURSE_BY_ID = gql`
    query GetCourseById($id: ID!) {
        course(id: $id) {
            id
            title
            creatorName
            tagline
            description
            status
            categories
            lessons {
                id
                title
                description
            }
            createdAt
        }
    }
`;