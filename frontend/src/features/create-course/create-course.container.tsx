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

    return (
        <CreateModulePresentational
            createCourseFormData={createCourseFormData}
            setCreateCourseFormData={setCreateCourseFormData}
            categories={CATEGORIES}
            handleSelectCategories={handleSelectCategories}
            saveCourse={saveCourse}
        />
    );
};

export default CreateCourseContainer;
