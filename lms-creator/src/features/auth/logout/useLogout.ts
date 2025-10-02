import * as ApolloReact from "@apollo/client/react";
import { LOGOUT_MUTATION } from "./query";

export function useLogout() {
  const [logoutMutation, { data, loading, error }] = ApolloReact.useMutation(LOGOUT_MUTATION);

  const logout = async () => {
    try {
      const response = await logoutMutation();
      return response.data?.logout;
    } catch (err) {
      throw err;
    }
  };

  return {
    logout,
    data,
    loading,
    error,
  };
}
