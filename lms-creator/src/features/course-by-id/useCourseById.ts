import { CourseWithLessons, Lesson } from "@/src/types/backend-data";
import { GET_COURSE_BY_ID, PUBLISH_COURSE } from "./query";
import * as ApolloReact from "@apollo/client/react";
import { useState, useEffect } from "react";

interface CourseData {
    course: CourseWithLessons;
}

interface PublishCourseResponse {
    publishCourse: {
        status: string;
        message: string;
    };
}

export function useCourseById(courseId: number | null, title: string) {
    const [courseWithLessons, setCourseWithLessons] = useState<CourseWithLessons>();
    const { data, loading, error, refetch } = ApolloReact.useQuery<CourseData>(GET_COURSE_BY_ID, {
        variables: { courseId, title },
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

    // Implement the PUBLISH_COURSE mutation here
    const [publishCourseMutation, { loading: publishing, error: publishError }] =
        ApolloReact.useMutation<PublishCourseResponse>(PUBLISH_COURSE);
    const publishCourse = async (courseIdToPublish: number) => {
        try {
            const { data } = await publishCourseMutation({
                variables: { courseId: courseIdToPublish },
            });
            if (data && data.publishCourse && data.publishCourse.status === "SUCCESS") {
                refetch();
            }
            return data?.publishCourse;
        } catch (err) {
            throw err;
        }
    };

    return { 
        course: courseWithLessons || null, 
        loading, 
        error,
        refetch,
        addNewLesson,
        publishCourse,
        publishing,
        publishError
    };
}
