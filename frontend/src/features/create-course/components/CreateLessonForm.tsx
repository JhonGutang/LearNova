import React from "react";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Textarea } from "@/src/shadcn/components/ui/textarea";
import { Button } from "@/src/shadcn/components/ui/button";
import { useCreateLesson } from "../hooks/useCreateLesson";

const CreateLessonForm: React.FC = () => {
  const { lessonFormData, setLessonFormData, saveLesson } = useCreateLesson();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setLessonFormData((prev) => ({
      ...prev,
      [id === "lesson-title"
        ? "title"
        : "description"]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveLesson();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Create Lesson</h2>
        <Label className="mb-1" htmlFor="lesson-title">
          Lesson Name
        </Label>
        <Input
          id="lesson-title"
          type="text"
          placeholder="Enter lesson title"
          value={lessonFormData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label className="mb-1" htmlFor="lesson-description">
          Description
        </Label>
        <Textarea
          id="lesson-description"
          placeholder="Enter lesson description"
          rows={4}
          value={lessonFormData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="w-full">
          Save Lesson
        </Button>
      </div>
    </form>
  );
};

export default CreateLessonForm;
