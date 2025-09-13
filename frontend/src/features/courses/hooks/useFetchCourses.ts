import { Course } from "@/src/types/backend-data";
import { GET_COURSES } from "../query";
import * as ApolloReact from "@apollo/client/react";

interface CoursesData {
    courses: Course[];
}

export function useFetchCourses() {
    const { data, loading, error } = ApolloReact.useQuery<CoursesData>(GET_COURSES, {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
    });

    return { 
        courses: data?.courses || [], 
        loading, 
        error,
        refetch: () => {}
    };
}