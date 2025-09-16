import { Course } from "@/src/types/backend-data";
import { GET_COURSE_BY_ID } from "./query";
import * as ApolloReact from "@apollo/client/react";

interface CourseData {
    course: Course;
}

export function useFetchCourse(courseId: string | null) {
    const { data, loading, error } = ApolloReact.useQuery<CourseData>(GET_COURSE_BY_ID, {
        variables: { id: courseId },
        skip: !courseId,
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
    });

    return { 
        course: data?.course || null, 
        loading, 
        error,
        refetch: () => {}
    };
}
