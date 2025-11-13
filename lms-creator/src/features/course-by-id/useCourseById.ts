import { CourseWithLessons, Lesson } from "@/src/types/backend-data";
import { GET_COURSE_BY_ID, PUBLISH_COURSE, EDIT_LESSONS } from "./query";
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

interface EditLessonLessonInput {
    lessonId: number;
    title: string;
    description: string;
}

interface EditLessonsResponse {
    editLesson: Lesson[];
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

    // Implement the EDIT_LESSONS mutation here
    const [editLessonsMutation, { loading: updatingLessons, error: editLessonsError }] =
        ApolloReact.useMutation<EditLessonsResponse>(EDIT_LESSONS);

    const editLessons = async (lessons: EditLessonLessonInput[]) => {
        if (!courseId) {
            throw new Error("Course ID is required to edit lessons");
        }

        // Make sure lessonId is always a number
        const lessonsWithNumberId = lessons.map((lesson) => ({
            ...lesson,
            lessonId: typeof lesson.lessonId === "string" ? Number(lesson.lessonId) : lesson.lessonId,
        }));

        try {
            const { data } = await editLessonsMutation({
                variables: {
                    lessons: {
                        courseId,
                        lessons: lessonsWithNumberId,
                    },
                },
            });

            if (data && data.editLesson) {
                // Update local state with the edited lessons
                setCourseWithLessons((prev) => {
                    if (!prev) return prev;

                    const updatedLessons = prev.lessons?.map((lesson) => {
                        const editedLesson = data.editLesson.find((l) => l.id === lesson.id);
                        return editedLesson || lesson;
                    });

                    return {
                        ...prev,
                        lessons: updatedLessons,
                    };
                });

                // Optionally refetch to ensure data consistency
                await refetch();
            }

            return data?.editLesson;
        } catch (err) {
            throw err;
        }
    };

    const updateCourse = (updatedFields: Partial<CourseWithLessons>) => {
        setCourseWithLessons((prev) => {
            if (!prev) {
                return prev;
            }
            const nextCourse = { ...prev };
            (Object.entries(updatedFields) as [keyof CourseWithLessons, unknown][]).forEach(([key, value]) => {
                if (value !== undefined) {
                    (nextCourse as Record<string, unknown>)[key as string] = value;
                }
            });
            return nextCourse;
        });
    };

    return { 
        course: courseWithLessons || null, 
        loading, 
        error,
        refetch,
        addNewLesson,
        publishCourse,
        publishing,
        publishError,
        updateCourse,
        editLessons,
        updatingLessons,
        editLessonsError,
    };
}