"use client";

import React, { useState } from "react";
import { Post } from "@/types/data";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { usePosts } from "../usePost";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { handleReactPost } = usePosts();
  const [isLiking, setIsLiking] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = post.hasLiked;

  const handleReaction = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await handleReactPost(post.id, !isActive);
    } catch (error) {
      console.error("Failed to react to post:", error);
    } finally {
      setIsLiking(false);
    }
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

      {/* Actions: Reaction and Comment */}
      <div className="flex items-center gap-6 mt-2">
        <button
          onClick={handleReaction}
          className={`cursor-pointer flex items-center gap-1 font-medium transition-colors focus:outline-none text-teal-700 hover:text-teal-900 px-2 py-1 rounded`}
          aria-label="React to post"
          type="button"
          disabled={isLiking}
        >
          <ThumbsUp
            className="w-5 h-5"
            fill={isActive ? "#0f766e" : "none"}
            stroke={isActive ? "#0f766e" : "currentColor"}
          />
          <span>{isActive ? "Liked" : "Like"}</span>
        </button>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-teal-700 font-medium transition-colors focus:outline-none"
          aria-label="View comments"
          type="button"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
