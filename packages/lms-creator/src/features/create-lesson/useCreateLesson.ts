import { useState } from "react";
import {
  CreateLessonFormData,
  CreateLessonResponse,
} from "@lms/shared-types";
import { CREATE_LESSON } from "./query";
import * as ApolloReact from "@apollo/client/react";
import { CustomToast } from "@/src/shared/CustomToast";

export const useCreateLesson = () => {
  const [form, setForm] = useState<CreateLessonFormData>({
    title: "",
    description: "",
  });

  const [createLesson, { loading, error }] = ApolloReact.useMutation(
    CREATE_LESSON,
    {
      onCompleted: () => {
        setForm({
          title: "",
          description: "",
        });
      },
      onError: () => {},
      refetchQueries: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    courseId: string
  ): Promise<CreateLessonResponse["createLesson"]> => {
    const response = await createLesson({
      variables: {
        input: {
          course_id: Number(courseId),
          title: form.title,
          description: form.description,
        },
      },
    });
    
    const data = response.data as CreateLessonResponse;
  
    if (!data || !data.createLesson) {
      throw new Error("No lesson data returned from server.");
    }

    CustomToast({
      type: "success",
      title: "Lesson created!",
      description: `Lesson '${data.createLesson.title}' was created successfully.`,
    });
    return data.createLesson;
  };

  return {
    form,
    loading,
    error: error ? error.message : null,
    handleChange,
    handleSubmit,
    setForm,
  };
};
