import { credentials, Role } from "@/types/data";
import * as ApolloReact from "@apollo/client/react";
import { LOGIN_STUDENT } from "./query";
import { CustomToast } from "@/shared/CustomToast";

export const useAuth = () => {
  const [loginAndCreateStudent, { data, loading, error }] =
    ApolloReact.useMutation(LOGIN_STUDENT);

  const login = async (input: credentials) => {
    try {
      input.role = Role.STUDENT;
      const response = await loginAndCreateStudent({
        variables: {
          input,
        },
      });

      // Fix: Use comparison (===) instead of assignment (=)
      // Also, make sure to check for response.data and response.data.login existence
      const loginResult = (response.data as any)?.login;
      if (loginResult?.status === "ERROR") {
        CustomToast({
          type: "error",
          title: "Signin Failed",
          description: loginResult?.message,
        });
      } else {
        CustomToast({
          type: "success",
          title: "Signed in Successfully",
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return { login, data, loading, error };
};
