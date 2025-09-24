import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Textarea } from "@/src/shadcn/components/ui/textarea";
import ChipToggle from "@/src/shared/ChipToggle";
import ErrorMessage from "@/src/shared/ErrorMessage";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shadcn/components/ui/dialog";
import { useCreateCourse } from "./useCreateCourse";
import { Plus } from "lucide-react";
import { Course } from "@/src/types/backend-data";

interface CreateCourseFormProps {
  addCourse: (newCourse: Course) => void
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({addCourse}) => {
  const {
    createCourseFormData,
    setCreateCourseFormData,
    handleSelectCategories,
    CATEGORIES,
    saveCourse
  } = useCreateCourse();
  const [open, setOpen] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createCourseFormData.categories.length === 0) {
      setCategoryError("Please select at least one category");
      return;
    }
    setCategoryError(null);
    const newCourse = await saveCourse();
    addCourse(newCourse)
    setOpen(false);
  };

  // Clear error if user selects a category after error
  React.useEffect(() => {
    if (categoryError && createCourseFormData.categories.length > 0) {
      setCategoryError(null);
    }
  }, [createCourseFormData.categories, categoryError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button> <Plus/> Create Course</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-0">
        <div className="w-full bg-white rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-6">
              Create Course
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">
                Course Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                value={createCourseFormData.title}
                onChange={(e) =>
                  setCreateCourseFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
                placeholder="Enter Module Title"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                type="text"
                value={createCourseFormData.tagline}
                onChange={(e) =>
                  setCreateCourseFormData((prev) => ({
                    ...prev,
                    tagline: e.target.value,
                  }))
                }
                placeholder="Enter a short tagline"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={createCourseFormData.description}
                onChange={(e) =>
                  setCreateCourseFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter Course description"
                rows={8}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 mt-2" id="category">
                {CATEGORIES.map((category) => {
                  const isSelected =
                    createCourseFormData.categories.includes(category);
                  return (
                    <ChipToggle
                      key={category}
                      option={category}
                      isSelected={isSelected}
                      onToggle={() => handleSelectCategories(category)}
                    />
                  );
                })}
              </div>
              {(categoryError || createCourseFormData.categories.length === 0) && (
                <ErrorMessage>
                  {categoryError || "Please select at least one category"}
                </ErrorMessage>
              )}
            </div>
            <Button className="w-full" type="submit">Create Course</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseForm;
