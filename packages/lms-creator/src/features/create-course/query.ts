import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
    mutation CreateCourse($input: CourseInput!) {
        createCourse(input: $input) {
            id
            title
            tagline
            categories
            createdAt
        }
    }
`;