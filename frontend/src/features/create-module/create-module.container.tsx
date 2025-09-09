'use client'
import React from "react";
import CreateModulePresentational from "./create-module.presentational";
import useProgressBarTrack from "@/src/shadcn/hooks/useProgressBarTrack";
import { useCreateModules } from "./hooks/useCreateModules";
const CreateModuleContainer: React.FC = () => {
    const {
        createModuleformData,
        setCreateModuleFormData,
        CATEGORIES,
        handleSelectCategories,
        saveModule
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
            handleSelectCategories={handleSelectCategories}
            currentStep={currentStep}
            totalSteps={totalSteps}
            progressPercent={progressPercent}
            nextStep={nextStep}
            prevStep={prevStep}
            saveModule={saveModule}
        />
    );
};

export default CreateModuleContainer;
