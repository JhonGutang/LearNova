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
}

const CARD_WIDTH = 320;
const CARD_HEIGHT = 430; // Set a fixed height for consistency

const CoursesCardView: React.FC<CardViewProps> = ({
  courseName,
  tagline,
  author,
  className = "",
  children,
  chips,
  rating = 5,
  reviewCount = 123,
  imageUrl,
}) => {
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
      {/* Course Image Section */}
      <div
        className="relative h-48 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-t-xl overflow-hidden"
        style={{
          minWidth: CARD_WIDTH,
          maxWidth: CARD_WIDTH,
          width: CARD_WIDTH,
          height: 192, // 48 * 4 = 192px
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={courseName || "Course"}
            className="w-full h-full object-cover"
            style={{ minHeight: "100%", minWidth: "100%" }}
          />
        ) : (
          <img
            src="https://i.ibb.co/v43WTV3H/geto.jpg"
            alt="Course"
            className="w-full h-full object-cover"
            style={{ minHeight: "100%", minWidth: "100%" }}
          />
        )}
      </div>

      {/* Content Section */}
      <div
        className="flex-1 px-6 py-4 flex flex-col"
        style={{
          minWidth: CARD_WIDTH,
          maxWidth: CARD_WIDTH,
          width: CARD_WIDTH,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top: Title, Chips, Author */}
        <div>
          {/* Course Title and Chips */}
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 flex-1 truncate">
              {courseName || "Course Title"}
            </h2>
            {chips && (
              <div className="ml-2 flex items-center">{chips}</div>
            )}
          </div>

          {/* Author */}
          {author && (
            <p className="text-sm text-gray-600 mb-1 truncate">{author}</p>
          )}
        </div>

        {/* Description and Rating: put closer together */}
        <div className="mt-2 flex flex-col gap-2">
          {/* Description */}
          {tagline && (
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-0">
              {tagline}
            </p>
          )}

          {/* Rating Section */}
          <div className="flex items-center mt-1">
            <span className="text-lg font-semibold text-gray-900 mr-2">{rating}</span>
            <div className="flex space-x-1 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>
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
