'use client'
import React from "react";
import ModulePreview from "./components/ModulePreview";
import CreateModuleForm from "./components/CreateModuleForm";
import { Progress } from "@/src/shadcn/components/ui/progress";
import { Button } from "@/src/shadcn/components/ui/button";
import { CreateModuleFormData } from "@/src/types/backend-data";
import { useRedirectLink } from "@/src/shadcn/hooks/useRedirectLink";
import { ArrowLeft } from "lucide-react";

type CreateModulePresentationalProps = {
  createModuleFormData: CreateModuleFormData
  setCreateModuleFormData: React.Dispatch<React.SetStateAction<CreateModuleFormData>>;
  categories: string[];
  currentStep: number;
  totalSteps: number;
  progressPercent: number;
  nextStep: () => void;
  prevStep: () => void;
};

const CreateModulePresentational: React.FC<CreateModulePresentationalProps> = ({
  createModuleFormData,
  setCreateModuleFormData,
  categories,
  currentStep,
  totalSteps,
  progressPercent,
  nextStep,
  prevStep,
}) => {
  const redirect = useRedirectLink();

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mx-10">
        <div className="w-full md:col-span-2">
          <div className="mb-4">
              {/* Back to Modules Button */}
          <div className="mb-4">
            <Button
              type="button"
              variant="outline"
              className="text-sm flex items-center gap-2"
              onClick={() => redirect("/modules")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Modules
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
                createModuleFormData={createModuleFormData}
                setCreateModuleFormData={setCreateModuleFormData}
                categories={categories}
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
