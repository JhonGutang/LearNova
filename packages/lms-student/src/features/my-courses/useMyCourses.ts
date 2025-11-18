import * as ApolloReact from "@apollo/client/react";
import { ENROLLED_COURSES_QUERY } from "./query";
import { CourseWithCreator as Course } from "@lms/shared-types";

interface EnrolledCoursesData {
  enrolledCourses: Course[];
}

export const useMyCourses = () => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<EnrolledCoursesData>(ENROLLED_COURSES_QUERY);

  return {
    courses: data?.enrolledCourses ?? [],
    loading,
    error,
    refetch,
  };
};
