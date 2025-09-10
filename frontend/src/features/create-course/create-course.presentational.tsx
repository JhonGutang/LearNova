'use client'
import React from "react";
import CreateCourseForm from "./components/CreateCourseForm";
import { Progress } from "@/src/shadcn/components/ui/progress";
import { Button } from "@/src/shadcn/components/ui/button";
import { CreateCourseFormData } from "@/src/types/backend-data";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { ArrowLeft } from "lucide-react";
import CreateLessonForm from "./components/CreateLessonForm";

type CreateCoursePresentationalProps = {
  createCourseFormData: CreateCourseFormData
  setCreateCourseFormData: React.Dispatch<React.SetStateAction<CreateCourseFormData>>;
  handleSelectCategories: (category: string) => void;
  categories: string[];
  currentStep: number;
  totalSteps: number;
  progressPercent: number;
  nextStep: () => void;
  prevStep: () => void;
  saveCourse: () => void;
};

const CreateModulePresentational: React.FC<CreateCoursePresentationalProps> = ({
  createCourseFormData,
  setCreateCourseFormData,
  categories,
  handleSelectCategories,
  currentStep,
  totalSteps,
  progressPercent,
  nextStep,
  prevStep,
  saveCourse
}) => {
  const { redirect } = useRedirectLink();

  // Handler for Next button
  const handleNext = () => {
    nextStep();
  };

  // Handler for Prev button
  const handlePrev = () => {
    prevStep();
  };

  return (
    <div className="w-full min-h-screen relative bg-gray-50">
      {/* Back to Courses button at the top left, outside the main card */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          type="button"
          variant="outline"
          className="text-sm flex items-center gap-2"
          onClick={() => redirect("/courses")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
      </div>
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} />
          {currentStep === 1 ? (
            <>
              <CreateCourseForm
                createCourseFormData={createCourseFormData}
                setCreateCourseFormData={setCreateCourseFormData}
                categories={categories}
                saveCourse={saveCourse}
                handleSelectCategories={handleSelectCategories}
              />
              <div className="flex justify-end mt-4">
                <Button type="button" onClick={handleNext} className="text-sm">Next</Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <CreateLessonForm />
                <Button
                  type="button"
                  variant="outline"
                  className="text-sm flex items-center gap-2 mt-4"
                  onClick={handlePrev}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModulePresentational;
