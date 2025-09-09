'use client'
import React from "react";
import CreateModulePresentational from "./create-module.presentational";
import useProgressBarTrack from "@/src/shadcn/hooks/useProgressBarTrack";
import { useCreateModules } from "../modules/hooks/useCreateModules";
const CreateModuleContainer: React.FC = () => {
    const {
        createModuleformData,
        setCreateModuleFormData,
        CATEGORIES,
    } = useCreateModules();
    const { currentStep,
        totalSteps,
        progressPercent,
        nextStep,
        prevStep, } = useProgressBarTrack();

    return (
        <CreateModulePresentational
            createModuleFormData={createModuleformData}
            setCreateModuleFormData={setCreateModuleFormData}
            categories={CATEGORIES}
            currentStep={currentStep}
            totalSteps={totalSteps}
            progressPercent={progressPercent}
            nextStep={nextStep}
            prevStep={prevStep}
        />
    );
};

export default CreateModuleContainer;
