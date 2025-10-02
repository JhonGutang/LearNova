import * as ApolloReact from "@apollo/client/react";
import { COURSES_WITH_CREATOR_QUERY } from "./query";
import { useState, useEffect } from "react";
import { Course } from "@/types/data";

// Define the expected shape of the query result
interface CoursesWithCreatorQueryData {
  courses: Course[];
}

export function useCoursesWithCreator() {
  const [courses, setCourses] = useState<Course[]>();
  const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesWithCreatorQueryData>(COURSES_WITH_CREATOR_QUERY, {
    fetchPolicy: "network-only",
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return {
    courses,
    loading,
    error,
    refetch,
  };
}
