import { useState } from "react";
import {
  CreateLessonFormData,
  CreateLessonResponse,
} from "@/src/types/backend-data";
import { CREATE_LESSON } from "./query";
import * as ApolloReact from "@apollo/client/react";

export const useCreateLesson = () => {
  const [form, setForm] = useState<CreateLessonFormData>({
    title: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);

  const [createLesson, { loading, error }] = ApolloReact.useMutation(
    CREATE_LESSON,
    {
      onCompleted: () => {
        setSuccess(true);
        setForm({
          title: "",
          description: "",
        });
      },
      onError: () => {
        setSuccess(false);
      },
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
    setSuccess(false);

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
    return data.createLesson;
  };

  return {
    form,
    loading,
    error: error ? error.message : null,
    success,
    handleChange,
    handleSubmit,
    setForm,
    setSuccess,
  };
};
