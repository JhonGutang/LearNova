'use client'
import React from "react";
import CreateCourseForm from "./components/CreateCourseForm";
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
  saveCourse: () => void;
};

const CreateModulePresentational: React.FC<CreateCoursePresentationalProps> = ({
  createCourseFormData,
  setCreateCourseFormData,
  categories,
  handleSelectCategories,
  saveCourse
}) => {
  const { redirect } = useRedirectLink();

  return (
    <div className="w-full min-h-screen relative bg-gray-50">
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
          <CreateCourseForm
            createCourseFormData={createCourseFormData}
            setCreateCourseFormData={setCreateCourseFormData}
            categories={categories}
            saveCourse={saveCourse}
            handleSelectCategories={handleSelectCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateModulePresentational;
