'use client'
import React from "react";
import CreateModulePresentational from "./create-course.presentational";
import useProgressBarTrack from "@/src/shadcn/hooks/useProgressBarTrack";
import { useCreateCourse } from "./hooks/useCreateCourse";
const CreateCourseContainer: React.FC = () => {
    const {
        createCourseFormData,
        setCreateCourseFormData,
        CATEGORIES,
        handleSelectCategories,
        saveCourse
    } = useCreateCourse();
    const { currentStep,
        totalSteps,
        progressPercent,
        nextStep,
        prevStep, } = useProgressBarTrack();

    return (
        <CreateModulePresentational
            createCourseFormData={createCourseFormData}
            setCreateCourseFormData={setCreateCourseFormData}
            categories={CATEGORIES}
            handleSelectCategories={handleSelectCategories}
            currentStep={currentStep}
            totalSteps={totalSteps}
            progressPercent={progressPercent}
            nextStep={nextStep}
            prevStep={prevStep}
            saveCourse={saveCourse}
        />
    );
};

export default CreateCourseContainer;
