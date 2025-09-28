import * as ApolloReact from "@apollo/client/react";
import { COURSES_WITH_CREATOR_QUERY } from "./query";
import { useState, useEffect } from "react";
import { CoursesWithCreator } from "@/types/data";

// Define the expected shape of the query result
interface CoursesWithCreatorQueryData {
  coursesWithCreator: CoursesWithCreator[];
}

export function useCoursesWithCreator() {
  const [courses, setCourses] = useState<CoursesWithCreator[]>();
  const { data, loading, error, refetch } = ApolloReact.useQuery<CoursesWithCreatorQueryData>(COURSES_WITH_CREATOR_QUERY, {
    fetchPolicy: "network-only",
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data.coursesWithCreator) {
      setCourses(data.coursesWithCreator);
    }
  }, [data]);

  return {
    courses,
    loading,
    error,
    refetch,
  };
}
