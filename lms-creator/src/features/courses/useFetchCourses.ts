import { useEffect, useState } from "react";
import { Course } from "@/src/types/backend-data";
import { GET_COURSES } from "./query";
import * as ApolloReact from "@apollo/client/react";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
interface CoursesData {
    courses: Course[];
}

export function useFetchCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const {redirect} = useRedirectLink()
    const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesData>(GET_COURSES, {
        fetchPolicy: "network-only",
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data && data.courses) {
            setCourses(data.courses);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            redirect("/error");
        }
    }, [error]);

    const addNewCourse = (newCourse: Course) => {
        setCourses(prevCourses => [...prevCourses, newCourse]);
    }

    return { 
        courses, 
        loading, 
        error,
        refetch,
        addNewCourse
    };
}