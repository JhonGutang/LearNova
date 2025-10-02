import { CourseWithLessons, Lesson } from "@/src/types/backend-data";
import { GET_COURSE_BY_ID } from "./query";
import * as ApolloReact from "@apollo/client/react";
import { useState } from "react";
import { useEffect } from "react";
interface CourseData {
    course: CourseWithLessons;
}

export function useCourseById(courseId: string | null, title: string) {
    const [courseWithLessons, setCourseWithLessons] = useState<CourseWithLessons>();
    const { data, loading, error, refetch } = ApolloReact.useQuery<CourseData>(GET_COURSE_BY_ID, {
        variables: { id: courseId, title:  title },
        skip: !courseId,
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data && data.course) {
            setCourseWithLessons(data.course);
        }
    }, [data]);

    const addNewLesson = (newLesson: Lesson) => {
        if (courseWithLessons) {
            const updatedCourse = {
                ...courseWithLessons,
                lessons: [...(courseWithLessons.lessons || []), newLesson],
            };
            setCourseWithLessons(updatedCourse);
        }
    };

    return { 
        course: courseWithLessons || null, 
        loading, 
        error,
        refetch,
        addNewLesson
    };
}
