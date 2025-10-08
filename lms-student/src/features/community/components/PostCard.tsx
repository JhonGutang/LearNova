"use client";

import React from "react";
import { Post } from "@/types/data";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Student Info Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-semibold text-teal-800 text-sm">
          {getInitials(post.owner.firstName)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{post.owner.firstName + " " + post.owner.lastName}</h4>
          <p className="text-sm text-gray-500">{post.createdAt}</p>
        </div>
      </div>

      {/* Topic */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{post.topic}</h3>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;
