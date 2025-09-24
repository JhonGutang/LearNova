"use client";

import React, { useState } from "react";
import { Button } from "@/src/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/src/shadcn/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCreateLesson } from "./useCreateLesson";
import { Lesson } from "@/src/types/backend-data";

interface CreatelessonFormDialogProps {
  courseId: string;
  addLesson: (newLesson: Lesson) => void;
}

const CreatelessonFormDialog: React.FC<CreatelessonFormDialogProps> = ({
  courseId,
  addLesson,
}) => {
  const [open, setOpen] = useState(false);

  const {
    form,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
    setForm,
    setSuccess,
  } = useCreateLesson();

  const handleDialogClose = () => {
    setOpen(false);
    setForm({
      title: "",
      description: "",
    });
    setSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLesson = await handleSubmit(courseId);
    addLesson(newLesson);
    if (!error) {
      setOpen(false);
      setForm({
        title: "",
        description: "",
      });
      setSuccess(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Add Lesson
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Lesson</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="lesson-title"
                  className="block text-sm font-medium mb-1"
                >
                  Title
                </label>
                <input
                  id="lesson-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Enter lesson title"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lesson-description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="lesson-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Enter lesson description"
                  rows={3}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && (
                <div className="text-green-600 text-sm">
                  Lesson created successfully!
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleDialogClose}
                >
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatelessonFormDialog;
