import { useState, useCallback } from 'react';


export default function useProgressBarTrack() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const nextStep = useCallback(() => setCurrentStep((s) => Math.min(totalSteps, s + 1)), []);
  const prevStep = useCallback(() => setCurrentStep((s) => Math.max(1, s - 1)), []);
  const goToStep = useCallback((step: number) => setCurrentStep(Math.min(totalSteps, Math.max(1, step))), []);


  return {
    currentStep,
    setCurrentStep,
    totalSteps,
    progressPercent,
    nextStep,
    prevStep,
    goToStep,
  };
}
