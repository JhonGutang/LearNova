import { useEffect, useState } from "react";
import * as ApolloReact from "@apollo/client/react";
import { CourseWithCreatorName as Course, CourseWithLessonsCreator as CourseWithLessons, LessonWithProgress as Lesson } from "@lms/shared-types";
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/shadcn/components/ui/tabs";
import { EDIT_COURSE, EDIT_LESSONS } from "../query";
import { CustomToast } from "@/src/shared/CustomToast";

interface EditCourseModalProps {
  course: CourseWithLessons;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCourseUpdated: (updatedCourse: Partial<Course>) => void;
  onLessonsUpdated?: () => void;
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

interface EditLessonsResponse {
  editLesson: Lesson[];
}

type EditCourseFormState = {
  title: string;
  tagline: string;
  description: string;
};

type LessonDraft = {
  id: number;
  title: string;
  description: string;
};

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  course,
  open,
  onOpenChange,
  onCourseUpdated,
  onLessonsUpdated,
}) => {
  const [formState, setFormState] = useState<EditCourseFormState>({
    title: course.title,
    tagline: course.tagline,
    description: course.description,
  });

  const [lessonDrafts, setLessonDrafts] = useState<LessonDraft[]>(
    Array.isArray(course.lessons)
      ? course.lessons.map((lesson: any) => ({
          id: Number(lesson.id), // Convert to number here
          title: lesson.title,
          description: lesson.description,
        }))
      : []
  );

  const [tab, setTab] = useState<string>("details");
  const [hasLessonChanges, setHasLessonChanges] = useState<boolean>(false);

  const [editCourse, { loading: loadingCourse }] =
    ApolloReact.useMutation<EditCourseResponse>(EDIT_COURSE);

  const [editLessons, { loading: loadingLessons }] =
    ApolloReact.useMutation<EditLessonsResponse>(EDIT_LESSONS);

  useEffect(() => {
    if (open) {
      setFormState({
        title: course.title,
        tagline: course.tagline,
        description: course.description,
      });
      setLessonDrafts(
        Array.isArray(course.lessons)
          ? course.lessons.map((lesson: any) => ({
              id: Number(lesson.id), // Convert to number here
              title: lesson.title,
              description: lesson.description,
            }))
          : []
      );
      setTab("details");
      setHasLessonChanges(false);
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

  const handleLessonChange = (
    lessonId: number,
    field: "title" | "description",
    value: string
  ) => {
    setLessonDrafts((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
      )
    );
    setHasLessonChanges(true);
  };

  const handleSaveLessons = async () => {
    try {
      const lessonsToUpdate = lessonDrafts.map((lesson) => ({
        lessonId: Number(lesson.id), // Ensure it's converted to a number
        title: lesson.title,
        description: lesson.description,
      }));

      const { data } = await editLessons({
        variables: {
          lessons: {
            courseId: Number(course.id),
            lessons: lessonsToUpdate,
          },
        },
      });

      if (data?.editLesson) {
        setHasLessonChanges(false);

        CustomToast({
          type: "success",
          title: "Lessons updated!",
          description: `${data.editLesson.length} lesson(s) updated successfully.`,
        });

        // Trigger callback to refetch course data if provided
        if (onLessonsUpdated) {
          onLessonsUpdated();
        }
      }
    } catch (error) {
      CustomToast({
        type: "error",
        title: "Failed to update lessons",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while updating the lessons.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0">
        <div className="w-full bg-white rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-6">
              Edit Course
            </DialogTitle>
          </DialogHeader>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="lessons">
                Modify Lessons
                {hasLessonChanges && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Course Details */}
            <TabsContent value="details">
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
                    disabled={loadingCourse}
                  >
                    {loadingCourse ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Tab 2: Lessons */}
            <TabsContent value="lessons">
              <div className="space-y-4">
                <div
                  className="space-y-6"
                  style={{
                    maxHeight: "50vh",
                    overflowY: "auto",
                    paddingRight: "0.5rem",
                  }}
                >
                  {lessonDrafts.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                      No lessons to edit.
                    </div>
                  ) : (
                    lessonDrafts.map((lesson, idx) => (
                      <div key={lesson.id}>
                        <div className="border rounded-md p-4 bg-gray-50">
                          <div className="font-medium mb-3 text-gray-700">
                            Lesson {idx + 1}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor={`lesson-title-${lesson.id}`}>
                                Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id={`lesson-title-${lesson.id}`}
                                type="text"
                                value={lesson.title}
                                onChange={(e) =>
                                  handleLessonChange(
                                    lesson.id,
                                    "title",
                                    e.target.value
                                  )
                                }
                                placeholder="Lesson name"
                                className="mt-1"
                                required
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`lesson-description-${lesson.id}`}
                              >
                                Description
                              </Label>
                              <Textarea
                                id={`lesson-description-${lesson.id}`}
                                value={lesson.description}
                                onChange={(e) =>
                                  handleLessonChange(
                                    lesson.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Lesson description"
                                rows={4}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Separator between lessons, except after the last one */}
                        {idx < lessonDrafts.length - 1 && (
                          <div className="my-4 border-t border-gray-300" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Save button for lessons */}
                {lessonDrafts.length > 0 && (
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        // Reset to original lesson data
                        setLessonDrafts(
                          Array.isArray(course.lessons)
                            ? course.lessons.map((lesson: any) => ({
                                id: Number(lesson.id), // Convert to number here
                                title: lesson.title,
                                description: lesson.description,
                              }))
                            : []
                        );
                        setHasLessonChanges(false);
                      }}
                      className="cursor-pointer"
                      disabled={!hasLessonChanges || loadingLessons}
                    >
                      Reset
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSaveLessons}
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600"
                      disabled={!hasLessonChanges || loadingLessons}
                    >
                      {loadingLessons ? "Saving..." : "Save Lessons"}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;
