import { useEffect, useState } from "react";
import * as ApolloReact from "@apollo/client/react";
import { Course } from "@/src/types/backend-data";
import { Button } from "@/src/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/shadcn/components/ui/dialog";
import { Input } from "@/src/shadcn/components/ui/input";
import { Label } from "@/src/shadcn/components/ui/label";
import { Textarea } from "@/src/shadcn/components/ui/textarea";
import { EDIT_COURSE } from "../query";
import { CustomToast } from "@/src/shared/CustomToast";

interface EditCourseModalProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCourseUpdated: (updatedCourse: Partial<Course>) => void;
}

interface EditCourseResponse {
  editCourse: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    categories: string[];
    status: string;
  };
}

type EditCourseFormState = {
  title: string;
  tagline: string;
  description: string;
};

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  course,
  open,
  onOpenChange,
  onCourseUpdated,
}) => {
  const [formState, setFormState] = useState<EditCourseFormState>({
    title: course.title,
    tagline: course.tagline,
    description: course.description,
  });

  const [editCourse, { loading }] = ApolloReact.useMutation<EditCourseResponse>(
    EDIT_COURSE
  );

  useEffect(() => {
    if (open) {
      setFormState({
        title: course.title,
        tagline: course.tagline,
        description: course.description,
      });
    }
  }, [course, open]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await editCourse({
        variables: {
          editCourseInput: {
            courseId: Number(course.id),
            title: formState.title,
            tagline: formState.tagline,
            description: formState.description,
          },
        },
      });

      if (data?.editCourse) {
        onCourseUpdated({
          title: data.editCourse.title,
          tagline: data.editCourse.tagline,
          description: data.editCourse.description,
          categories: data.editCourse.categories,
          status: data.editCourse.status,
        });

        CustomToast({
          type: "success",
          title: "Course updated!",
          description: `Course '${data.editCourse.title}' was updated successfully.`,
        });
      }

      onOpenChange(false);
    } catch (error) {
      CustomToast({
        type: "error",
        title: "Failed to update course",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while updating the course.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0">
        <div className="w-full bg-white rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-6">
              Edit Course
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="edit-course-title">
                Course Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-course-title"
                type="text"
                value={formState.title}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
                required
                placeholder="Enter course title"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-course-tagline">Tagline</Label>
              <Input
                id="edit-course-tagline"
                type="text"
                value={formState.tagline}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    tagline: event.target.value,
                  }))
                }
                placeholder="Enter a short tagline"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-course-description">Description</Label>
              <Textarea
                id="edit-course-description"
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                placeholder="Enter course description"
                rows={8}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;

