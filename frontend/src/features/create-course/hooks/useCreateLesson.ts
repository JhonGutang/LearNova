import { useState } from "react";
import { CreateLessonFormData } from "@/src/types/backend-data";
export function useCreateLesson() {
  const [lessonFormData, setLessonFormData] = useState<CreateLessonFormData>({
    title: "",
    description: "",
  });

  const saveLesson = () => {
    // TODO: Implement save logic (e.g., API call)
    // For now, just log the data
    console.log("Saving lesson:", lessonFormData);
  };

  return {
    lessonFormData,
    setLessonFormData,
    saveLesson,
  };
}
