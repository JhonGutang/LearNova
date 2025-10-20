import { credentials, Error, Role, studentCreateInput } from "@/types/data";
import * as ApolloReact from "@apollo/client/react";
import { LOGIN_STUDENT, CREATE_STUDENT, LOGOUT } from "./query";
import { CustomToast } from "@/shared/CustomToast";
import { useCallback } from "react";
import { SignupFormFields } from "@/constants/AuthFormFields";
import { useRedirectLink } from "@/hooks/useRedirect";
import { BaseResponse } from "@/types/responses";

export const useAuth = () => {
  const { redirect } = useRedirectLink();

  // Mutations for login, registration, and logout
  const [LoginStudent, { data: loginData, loading: loginLoading, error: loginError }] =
    ApolloReact.useMutation(LOGIN_STUDENT);
  const [CreateStudent, { data: registerData, loading: registerLoading, error: registerError }] =
    ApolloReact.useMutation(CREATE_STUDENT);
  const [LogoutMutation, { data: logoutData, loading: logoutLoading, error: logoutError }] =
    ApolloReact.useMutation(LOGOUT);

  // Helper for showing toast
  const showToast = useCallback((type: "success" | "error", title: string, description?: string) => {
    CustomToast({ type, title, description });
  }, []);

  // Validation logic (private)
  const validate = useCallback((form: Record<string, string>) => {
    const newErrors: { [key: string]: string } = {};
    // Get required fields from SignupFormFields (excluding optional and confirm-password)
    SignupFormFields.forEach((field) => {
      if (field.id !== "middle-name" && field.id !== "confirm-password" && !form[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }
    if (form.password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(form.password)) {
      newErrors.password = "Password must be at least 8 characters and include a number and a letter";
    }
    if (form.phone && !/^[0-9\-\s\(\)]+$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (form.password !== form["confirm-password"]) {
      newErrors["confirm-password"] = "Passwords do not match";
    }
    return newErrors;
  }, []);

  // Login handler
  const login = async (input: credentials) => {
    try {
      input.role = Role.STUDENT;
      const response = await LoginStudent({ variables: { input } });
      const loginResult = (response.data as BaseResponse)?.login;
      if (loginResult?.status === "ERROR") {
        showToast("error", "Signin Failed", loginResult?.message);
      } else {
        showToast("success", "Signed in Successfully");
        setTimeout(() => {
          redirect('/home')
        }, 1500);
      }
    } catch (err) {
      showToast("error", "Signin Failed", (err as Error)?.message);
      return;
    }
  };

  // Register handler
  const register = async (
    form: Record<string, string>,
    onSuccess?: () => void,
    onError?: (errors: Record<string, string>) => void
  ) => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      if (onError) onError(validationErrors);
      return;
    }
    const input: studentCreateInput = {
      email: form.email,
      firstName: form["first-name"],
      lastName: form["last-name"],
      phone: form.phone,
      address: form.address,
      password: form.password,
    };
    if (form["middle-name"]) input.middleName = form["middle-name"];
    try {
      const response = await CreateStudent({ variables: { input } });
      const registerResult = (response.data as BaseResponse)?.createStudent;
      if (registerResult?.status === "ERROR") {
        showToast("error", "Signup Failed", registerResult?.message || "An error occurred during signup.");
        return;
      } else {
        showToast("success", "Account Created");
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      showToast("error", "Signup Failed", (err as Error)?.message || "An unexpected error occurred.");
      return;
    }
  };

  // Logout handler
  const logout = useCallback(async () => {
    try {
      const response = await LogoutMutation();
      const logoutResult = (response.data as BaseResponse).logout;
      if (logoutResult?.status === "ERROR") {
        showToast("error", "Logout Failed", logoutResult?.message);
      } else {
        showToast("success", "Logged out");
        setTimeout(() => {
          redirect("/signin");
        }, 1000);
      }
    } catch (err) {
      showToast("error", "Logout Failed", (err as Error)?.message);
      return;
    }
  }, [LogoutMutation, redirect, showToast]);

  return {
    login,
    register,
    logout,
    loginData,
    loginLoading,
    loginError,
    registerData,
    registerLoading,
    registerError,
    logoutData,
    logoutLoading,
    logoutError,
  };
};
