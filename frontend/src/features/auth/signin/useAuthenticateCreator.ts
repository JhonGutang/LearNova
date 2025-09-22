// useAuthenticateCreator.ts
import * as ApolloReact from "@apollo/client/react";
import { useState } from "react";
import { AUTHENTICATE_CREATOR } from "./query";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";

interface Credentials {
  email: string;
  password: string;
  role: String
}

export const useAuthenticateCreator = () => {
  const { redirect } = useRedirectLink();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
    role: "CREATOR"
  });
  const [error, setError] = useState<string | null>(null);

  const [authenticateCreator, { loading, data }] = ApolloReact.useMutation(
    AUTHENTICATE_CREATOR
  );

  const handleAuthentication = async () => {
    setError(null);
    try {
      const response = await authenticateCreator({
        variables: {
          input: {
            email: credentials.email,
            password: credentials.password,
            role: credentials.role
          },
        },
      });

      const result =
        (response?.data as { login?: { status: string; message: string } })
          ?.login;

      if (!result) {
        setError("No response from server.");
        return null;
      }

      if (result.status !== "SUCCESS") {
        setError(result.message || "Invalid credentials.");
        return null;
      }

      // redirect after successful login
      setTimeout(() => {
        redirect("/courses");
      }, 3000);

      return response;
    } catch (err: any) {
      setError(
        err?.graphQLErrors?.[0]?.message ||
          err?.message ||
          "An error occurred during authentication."
      );
      return null;
    }
  };

  return {
    credentials,
    setCredentials,
    handleAuthentication,
    loading,
    data,
    error,
  };
};
