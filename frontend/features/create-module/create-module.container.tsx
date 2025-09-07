'use client'
import React from "react";
import CreateModulePresentational from "./create-module.presentational";
import { useModuleData } from "@/hooks/useModuleData";
import useProgressBarTrack from "@/hooks/useProgressBarTrack";
const CreateModuleContainer: React.FC = () => {
    const {
        createModuleformData,
        setCreateModuleFormData,
        categories,
    } = useModuleData();
    const { currentStep,
        totalSteps,
        progressPercent,
        nextStep,
        prevStep, } = useProgressBarTrack();

    return (
        <CreateModulePresentational
            createModuleFormData={createModuleformData}
            setCreateModuleFormData={setCreateModuleFormData}
            categories={categories}
            currentStep={currentStep}
            totalSteps={totalSteps}
            progressPercent={progressPercent}
            nextStep={nextStep}
            prevStep={prevStep}
        />
    );
};

export default CreateModuleContainer;
