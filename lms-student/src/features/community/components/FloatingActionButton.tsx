"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="cursor-pointer fixed bottom-6 right-6 w-40 h-14 rounded-full bg-teal-800 hover:bg-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 z-40 flex items-center justify-center text-lg font-semibold gap-2"
      aria-label="Create new post"
    >
      <Pencil className="w-6 h-6" />
      Create Post
    </Button>
  );
};

export default FloatingActionButton;
