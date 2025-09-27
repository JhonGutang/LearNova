import { credentials, Role, studentCreateInput } from "@/types/data";
import * as ApolloReact from "@apollo/client/react";
import { LOGIN_STUDENT, CREATE_STUDENT } from "./query";
import { CustomToast } from "@/shared/CustomToast";

export const useAuth = () => {
  // Mutations for login and registration
  const [LoginStudent, { data: loginData, loading: loginLoading, error: loginError }] =
    ApolloReact.useMutation(LOGIN_STUDENT);
  const [CreateStudent, { data: registerData, loading: registerLoading, error: registerError }] =
    ApolloReact.useMutation(CREATE_STUDENT);

  // Login handler
  const login = async (input: credentials) => {
    try {
      input.role = Role.STUDENT;
      const response = await LoginStudent({ variables: { input } });
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

  // Register handler
  const register = async (input: studentCreateInput) => {
    try {
      const response = await CreateStudent({ variables: { input } });
      const registerResult = (response.data as any)?.createStudent;
      if (registerResult?.status === "ERROR") {
        CustomToast({
          type: "error",
          title: "Signup Failed",
          description: registerResult?.message || "An error occurred during signup.",
        });
      } else {
        CustomToast({
          type: "success",
          title: "Account Created",
        });
      }
    } catch (err) {
      CustomToast({
        type: "error",
        title: "Signup Failed",
        description: (err as any)?.message || "An unexpected error occurred.",
      });
      throw err;
    }
  };

  // Expose API and state
  return {
    login,
    register,
    loginData,
    loginLoading,
    loginError,
    registerData,
    registerLoading,
    registerError,
  };
};
