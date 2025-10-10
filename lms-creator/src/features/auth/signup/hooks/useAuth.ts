import { useState } from "react";
import type { FormType, StepType } from "@/src/types/form-types";
import * as ApolloReact from "@apollo/client/react";
import { CREATE_CREATOR } from "../query";
import { useFormNavigation } from "./useFormNavigation";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";


export const useAuth = (
  steps: StepType[]
) => {
  const { redirect } = useRedirectLink()
  const [form, setForm] = useState<FormType>({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Use the form navigation hook
  const navigation = useFormNavigation(steps);

  // Apollo mutation for creating a creator
  const [createCreator, { loading }] = ApolloReact.useMutation(CREATE_CREATOR);

  const handleChange = (key: keyof FormType, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    navigation.handleNext(e, form);
  };

  const handleBack = () => {
    navigation.handleBack();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!navigation.validateAllSteps(form)) return;

    // Prepare input for the mutation
    const input = {
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      password: form.password,
      email: form.email,
      phone: form.phone,
      address: form.address,
    };

    try {
      await createCreator({
        variables: {
          input,
        },
      });
      setIsSubmitted(true);
      setTimeout(() => {
        redirect('/courses');
      }, 3000);
      navigation.setError(null);
    } catch (err: any) {
      navigation.setError(
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        "An error occurred while creating your account."
      );
    }
  };

  return {
    form,
    error: navigation.error,
    step: navigation.step,
    isSubmitted,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
    setStep: navigation.setStep,
    setError: navigation.setError,
    loading,
    // Navigation utilities
    isFirstStep: navigation.isFirstStep,
    isLastStep: navigation.isLastStep,
    canGoNext: navigation.canGoNext,
    canGoBack: navigation.canGoBack,
    goToStep: navigation.goToStep,
  };
};
