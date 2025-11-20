"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostData } from "@lms/shared-types";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePostData) => Promise<void>;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState<CreatePostData>({
    topic: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic.trim() && formData.content.trim()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setFormData({ topic: "", content: "" });
        onClose();
      } catch (error) {
        console.error('Error submitting post:', error);
        // Error handling is done in the parent component
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ topic: "", content: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleCancel(); }}>
      <DialogContent
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onOpenAutoFocus={() => {
          const input = document.getElementById("topic");
          if (input) input.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Create New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Topic *
            </label>
            <Input
              type="text"
              id="topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="What's your post about?"
              required
              autoFocus
              className="text-lg"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              rows={8}
              required
              className="resize-none"
            />
          </div>
          <DialogFooter className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className=" cursor-pointer bg-teal-800 hover:bg-teal-700 text-white px-6 py-2 disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post to Community"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-2 disabled:opacity-50"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
