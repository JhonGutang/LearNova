'use client'
import React from "react";
import ModulePreview from "./components/ModulePreview";
import CreateModuleForm from "./components/CreateCourseForm";
import { Progress } from "@/src/shadcn/components/ui/progress";
import { Button } from "@/src/shadcn/components/ui/button";
import { CreateCourseFormData } from "@/src/types/backend-data";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { ArrowLeft } from "lucide-react";

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
  const {redirect} = useRedirectLink();

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mx-10">
        <div className="w-full md:col-span-2">
          <div className="mb-4">
          <div className="mb-4">
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} />
          </div>
          {currentStep === 1 ? (
            <>
              <CreateModuleForm
                createCourseFormData={createCourseFormData}
                setCreateCourseFormData={setCreateCourseFormData}
                categories={categories}
                saveCourse={saveCourse}
                handleSelectCategories={handleSelectCategories}
              />
              <div className="flex justify-end mt-4">
                <Button type="button" onClick={nextStep} className="text-sm">Next</Button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-6">Create Submodule</h2>
                  <div className="flex items-center justify-between">
                    <Button type="button" variant="ghost" onClick={prevStep} className="text-sm">Back</Button>
                    <Button type="submit" className="text-sm">Save Submodule</Button>
                  </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full md:col-span-3">
          <ModulePreview/>
        </div>
      </div>
    </div>
  );
};

export default CreateModulePresentational;
