'use client'
import React from "react";
import { useImageUpload } from "./useImageUpload";

const ProfilePreview: React.FC = () => {
  const {
    imageUrl,
    fileError,
    fileInputRef,
    handleImageClick,
    handleFileChange,
  } = useImageUpload();

  return (
    <div className="border rounded-lg p-6 flex flex-col items-center bg-white shadow">
      <div
        className="relative w-48 h-48 rounded-full border-4 border-blue-400 overflow-hidden mb-4 cursor-pointer group"
        onClick={handleImageClick}
        tabIndex={0}
        aria-label="Edit Profile Image"
        role="button"
      >
        <img
          src={imageUrl}
          alt="Profile Preview"
          className="object-cover w-full h-full transition-opacity"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-sm font-semibold">Edit</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="text-lg font-semibold text-gray-800">John Doe</div>
      {fileError && (
        <div className="text-xs text-red-500 mt-2">{fileError}</div>
      )}
    </div>
  );
};

export default ProfilePreview;