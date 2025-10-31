import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardViewProps {
  courseName?: string;
  tagline?: string;
  author?: string;
  className?: string;
  children?: React.ReactNode;
  chips?: React.ReactNode;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  isEnrolled?: boolean; // if student is enrolled, this will be true
  onEnrollClick?: () => void;
  onViewClick?: () => void;
}

const CARD_WIDTH = 320;
const CARD_HEIGHT = 430;

const CoursesCardView: React.FC<CardViewProps> = ({
  courseName,
  tagline,
  className = "",
  children,
  author,
  rating = 4.8,
  isEnrolled = false,
  onEnrollClick,
  onViewClick,
}) => {
  // Determine if student enrollment exists
  const enrolled = Boolean(isEnrolled);
  console.log(isEnrolled)

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col transition
        hover:shadow-xl hover:border-gray-300 hover:-translate-y-1
        ${className}
      `}
      style={{
        minHeight: CARD_HEIGHT,
        maxHeight: CARD_HEIGHT,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Upper Visual Section - Tech Icons */}
      <div
        className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-t-xl flex items-center justify-center p-8"
        style={{
          minWidth: CARD_WIDTH,
          maxWidth: CARD_WIDTH,
          width: CARD_WIDTH,
          height: 200, // Larger section for icons
        }}
      >
        {/* HTML5 Logo - Main center icon */}
        <div className="relative z-10">
          <div className="w-16 h-16 bg-orange-500 rounded-lg shadow-lg flex items-center justify-center transform rotate-12">
            <span className="text-white font-bold text-2xl">5</span>
          </div>
        </div>

        {/* Surrounding Tech Icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Left side icons */}
          <div className="absolute left-8 top-8 space-y-2">
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded"></div>
              <div className="w-4 h-1 bg-white rounded ml-1"></div>
              <div className="w-4 h-1 bg-white rounded ml-1"></div>
            </div>
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded"></div>
              <div className="w-4 h-1 bg-white rounded ml-1"></div>
              <div className="w-4 h-1 bg-white rounded ml-1"></div>
            </div>
          </div>

          {/* Right side icons */}
          <div className="absolute right-8 top-8 space-y-2">
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">j</span>
            </div>
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <div className="w-4 h-1 bg-white rounded"></div>
              <div className="w-4 h-1 bg-white rounded ml-1"></div>
              <div className="w-4 h-1 bg-white rounded ml-1"></div>
            </div>
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
              <div className="w-3 h-3 border-l-2 border-white"></div>
            </div>
          </div>

          {/* Bottom right icons */}
          <div className="absolute right-8 bottom-8 space-y-2">
            <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">.S</span>
            </div>
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
              <span className="text-black font-bold text-xs">ä</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Text Section */}
      <div
        className="flex-1 px-6 py-6 flex flex-col justify-between"
        style={{
          minWidth: CARD_WIDTH,
          maxWidth: CARD_WIDTH,
          width: CARD_WIDTH,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title, Author, and Description - Improved UI */}
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">
            {courseName || "Web Development Bootcamp"}
          </h2>
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center mr-2">
              <span className="text-orange-700 font-semibold text-lg">
                {author ? author.trim().split(" ").map(n => n[0]).join("") : "WD"}
              </span>
            </div>
            <span className="text-gray-600 text-sm font-medium">
              by <span className="text-gray-800">{author}</span>
            </span>
          </div>
          <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
            <p className="text-sm text-gray-700 leading-relaxed">
              {tagline || "Complete guide to modern web development"}
            </p>
          </div>
        </div>

        {/* Rating and Enrollment Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-gray-900 font-semibold">{rating}</span>
          </div>
          <Button
            onClick={enrolled ? onViewClick : onEnrollClick}
            className={`cursor-pointer text-sm px-4 py-2 ${
              enrolled
                ? "bg-teal-600 hover:bg-teal-700 text-white"
                : "bg-teal-800 hover:bg-teal-700 text-white"
            }`}
          >
            {enrolled ? "View Course" : "Enroll"}
          </Button>
        </div>

        {/* Action Button */}
        {children && (
          <div className="w-full mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesCardView;
