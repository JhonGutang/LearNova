import { useEffect, useState } from "react";
import { Course } from "@/src/types/backend-data";
import { GET_COURSES } from "./query";
import * as ApolloReact from "@apollo/client/react";

interface CoursesData {
    coursesByCreator: Course[];
}

export function useFetchCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesData>(GET_COURSES, {
        fetchPolicy: "network-only",
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data && data.coursesByCreator) {
            setCourses(data.coursesByCreator);
        }
    }, [data]);

    return { 
        courses, 
        loading, 
        error,
        refetch
    };
}