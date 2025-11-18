import * as ApolloReact from "@apollo/client/react";
import { USER_DETAILS_QUERY } from './query';
import { DashboardPage } from "@lms/shared-types";

interface DashboardPageInterface {
  DashboardPage: DashboardPage;
}

export const useUserDetails = () => {
  const { data, loading, error, refetch } = ApolloReact.useQuery<DashboardPageInterface>(USER_DETAILS_QUERY);

  return {
    dashboardPage: data?.DashboardPage,
    loading,
    error,
    refetch,
  };
};