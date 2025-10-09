import * as ApolloReact from "@apollo/client/react";
import { USER_DETAILS_QUERY } from './query';
import { StudentDetails } from "@/types/data";

interface StudentDetailsData {
  studentDetails: StudentDetails;
}

export const useUserDetails = () => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<StudentDetailsData>(USER_DETAILS_QUERY);

  return {
    studentDetails: data?.studentDetails,
    loading,
    error,
    refetch,
  };
};