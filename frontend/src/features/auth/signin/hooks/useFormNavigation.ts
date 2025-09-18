import { useState } from "react";
import type { FormType, StepType } from "@/src/types/form-types";

export const useFormNavigation = (steps: StepType[]) => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const validateStep = (form: FormType, currentStep: number = step) => {
    const currentFields = steps[currentStep].fields;
    
    // Validate required fields
    for (const field of currentFields) {
      if (field.required && !form[field.key]) {
        setError("Please fill in all required fields.");
        return false;
      }
    }
    
    // Validate password confirmation on password step
    if (steps[currentStep].key === "password") {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    
    setError(null);
    return true;
  };

  const validateAllSteps = (form: FormType) => {
    // Flatten all fields from all steps
    const allFields = steps.flatMap((step) => step.fields);

    for (const field of allFields) {
      if (field.required && !form[field.key]) {
        setError("Please fill in all required fields.");
        return false;
      }
    }
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleNext = (e: React.FormEvent, form: FormType) => {
    e.preventDefault();
    if (validateStep(form)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const goToStep = (stepIndex: number) => {
    setError(null);
    setStep(stepIndex);
  };

  const isFirstStep = step === 0;
  const isLastStep = step === steps.length - 1;
  const canGoNext = step < steps.length - 1;
  const canGoBack = step > 0;

  return {
    step,
    error,
    setError,
    setStep,
    validateStep,
    validateAllSteps,
    handleNext,
    handleBack,
    goToStep,
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoBack,
  };
};
