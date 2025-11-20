'use client'

import React from "react";
import Searchbar from "@/shared/Searchbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { X, Moon } from "lucide-react";

const categories = [
  "All Categories",
  "Programming",
  "Design",
  "Business",
  "Marketing",
  "Language",
  "Science",
];

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  const [open, setOpen] = React.useState(false);

  const showReset = selectedCategory !== categories[0];

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(categories[0]);
    setOpen(false);
  };

  const isActive = selectedCategory !== categories[0];

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <div className="relative flex items-center">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`cursor-pointer pr-8 transition-colors ${
                isActive
                  ? "bg-teal-600 text-white border-teal-600 hover:bg-teal-700 hover:text-white"
                  : ""
              }`}
              onClick={() => setOpen((prev) => !prev)}
            >
              {selectedCategory}
            </Button>
          </DropdownMenuTrigger>

          {showReset && (
            <button
              type="button"
              aria-label="Reset category"
              onClick={handleReset}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((cat) => (
            <DropdownMenuItem
              key={cat}
              onSelect={() => {
                setSelectedCategory(cat);
                setOpen(false);
              }}
              className={`cursor-pointer ${
                cat === selectedCategory
                  ? "font-semibold text-white bg-teal-600 hover:bg-teal-700 hover:text-white"
                  : ""
              }`}
            >
              {cat}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Light/Dark mode icon component (no function)
const LightDarkModeIcon = () => {
  // Just for visual: show both icons side by side, or you could show one
  return (
    <span className="flex items-center gap-1 text-gray-400">
      {/* <Sun className="w-5 h-5" /> */}
      <Moon className="w-5 h-5" />
    </span>
  );
};

const HeaderContents = () => {
  return (
    <div className="flex items-center gap-4">
      <CategoryDropdown />
      <Searchbar />
      <LightDarkModeIcon />
    </div>
  );
};

export default HeaderContents