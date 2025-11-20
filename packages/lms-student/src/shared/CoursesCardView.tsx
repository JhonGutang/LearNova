import React from "react";
import { Star } from "lucide-react";

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
  isEnrolled?: boolean; 
  onEnrollClick?: () => void;
  onViewClick?: () => void;
}

// Card height constant for consistency
const CARD_HEIGHT = 380;

const CoursesCardView: React.FC<CardViewProps> = ({
  courseName = "Advanced React Patterns",
  tagline = "Master modern React patterns and best practices for scalable applications",
  className = "",
  author = "Sarah Johnson",
  chips,
  rating = 4.8,
  isEnrolled = true,
  onEnrollClick,
  onViewClick,
  children,
}) => {
  // For demo: provide standard chips if not provided
  const displayChips =
    chips ??
    (
      <div className="flex items-center gap-2 mt-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">React</span>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">JavaScript</span>
        <span className="bg-blue-50 text-blue-500 border border-blue-200 text-xs font-semibold px-3 py-1 rounded-full">+2 more</span>
      </div>
    );

  return (
    <div
      className={`
      bg-white rounded-2xl shadow-[0_1px_10px_0px_rgba(16,30,115,0.07)] border border-[#f3f6fa] flex flex-col
      w-full max-w-sm mx-auto
      ${className}
      `}
      style={{
        minHeight: CARD_HEIGHT,
        height: CARD_HEIGHT,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {/* Top image section */}
      <div
        className="relative rounded-t-2xl overflow-hidden"
        style={{
          width: "100%",
          height: 156,
        }}
      >
        {/* Static background - replace src with course image if provided */}
        <img
          src="https://i.pinimg.com/736x/b3/47/3e/b3473e153e708db362d199b7339ebd26.jpg"
          alt="Course visual"
          style={{
            objectFit: "fill",
            width: "100%",
            height: "180px", // Fixed height for consistency
            display: "block",
            background: "linear-gradient(120deg,#0cb9e8 0%,#4285f4 100%)", // fallback
          }}
        />
        {/* Favorite button */}
        <button
          type="button"
          tabIndex={0}
          aria-label="Favorite"
          style={{
            position: "absolute",
            top: 15,
            right: 16,
            background: "#fff",
            border: "none",
            borderRadius: "9999px",
            boxShadow: "0 1px 6px 0 rgba(4, 39, 100, 0.07)",
            width: 25,
            height: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
          }}
          className="group"
        >
          <Star
            size={22}
            className="text-gray-400 group-hover:text-blue-400 transition-colors"
            strokeWidth={2}
            fill="none"
          />
        </button>
      </div>

      {/* Card content section */}
      <div
        className="flex-1 py-0 px-6 flex flex-col"
        style={{
          flex: 1,
          justifyContent: "stretch",
          width: "100%",
          background: "white",
        }}
      >
        <div className="mt-6">
          <h2 className="text-[17px] font-bold text-gray-900 mb-1">
            {courseName}
          </h2>
          <div className="flex items-center mb-2">
            <span className="text-gray-500 text-sm">by</span>
            <span className="ml-1 text-gray-800 text-[13px] font-medium">{author}</span>
          </div>
          <div>
            <p className="text-[15px] text-gray-700 mb-1">
              {tagline}
            </p>
          </div>
        </div>
        {/* Chips/tags row */}
        <div>
          {displayChips}
        </div>
        <div className="mt-auto">
          <button
            type="button"
            onClick={isEnrolled ? onViewClick : onEnrollClick}
            className={`
              mt-7 w-full
              bg-[#11a4f7] hover:bg-[#078cd6]
              text-white text-[17px] font-semibold 
              cursor-pointer
              py-[5px] rounded-[11px] shadow 
              transition-all duration-150 active:scale-[0.99]
              focus:outline-none
            `}
            style={{
              boxShadow: "0 1px 3px 0 rgba(10,82,200,0.08)",
            }}
          >
            {isEnrolled ? "View Course" : "Enroll"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesCardView;
