import React from "react";
import { GraduationCap } from "lucide-react";

interface CardViewProps {
  courseName?: string;
  tagline?: string;
  author?: string;
  className?: string;
  children?: React.ReactNode;
  chips?: React.ReactNode; // New prop for chips (e.g., enrolled chip)
}

const CARD_WIDTH = 330; // Consistent width for all card elements

const CoursesCardView: React.FC<CardViewProps> = ({
  courseName,
  tagline,
  author,
  className = "",
  children,
  chips, // Accept chips as a prop
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md border border-teal-100 flex flex-col transition 
        hover:shadow-lg hover:border-teal-300 hover:-translate-y-1 hover:ring-2 hover:ring-teal-100
        ${className}
      `}
      style={{
        minHeight: 240,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        width: CARD_WIDTH,
      }}
    >
      {/* Logo bar occupies full width, no padding */}
      <div
        className="flex items-center gap-2 mb-2 bg-teal-600 min-h-[70px] rounded-t-xl w-full pl-5"
        style={{ minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH, width: CARD_WIDTH }}
      >
        <GraduationCap className="w-8 h-8" stroke="#fff" />
        <span className="text-xl font-bold text-white tracking-wide">Learnify</span>
      </div>
      <div
        className="flex-1 px-6 py-2 flex flex-col"
        style={{ minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH, width: CARD_WIDTH }}
      >
        <div className="flex items-center justify-between">
          {courseName && (
            <h2 className="text-lg font-semibold text-teal-700">{courseName}</h2>
          )}
          {/* Chips placeholder (e.g., for enrolled chip) */}
          {chips && (
            <div className="ml-2 flex items-center">{chips}</div>
          )}
        </div>
        {author && (
          <p className="text-xs text-gray-400 mb-1">By {author}</p>
        )}
        {tagline && (
          <p className="text-sm text-gray-500">{tagline}</p>
        )}
        {/* Spacer to push button to bottom */}
        <div className="flex-1" />
        {children && (
          <div className="flex justify-end mt-2">{children}</div>
        )}
      </div>
    </div>
  );
};

export default CoursesCardView;
