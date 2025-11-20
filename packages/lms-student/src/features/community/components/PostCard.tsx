"use client";

import React, { useState } from "react";
import { Post } from "@lms/shared-types";
import { Heart, MessageCircle } from "lucide-react";
import { usePosts } from "../usePost";
import PostModal from "./PostModal";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { handleReactPost } = usePosts();
  const [isLiking, setIsLiking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Sub component/function for the actions section
  const renderActions = () => (
    <div className="flex items-center gap-6 mt-2">
      <button
        onClick={handleReaction}
        className={`cursor-pointer flex items-center gap-1 font-medium transition-colors focus:outline-none text-teal-700 hover:text-teal-900 px-2 py-1 rounded`}
        aria-label="React to post"
        type="button"
        disabled={isLiking}
      >
        <Heart
          className="w-7 h-7"
          fill={isActive ? "#0f766e" : "none"}
          stroke={isActive ? "#0f766e" : "currentColor"}
        />
        {/* Reaction Count */}
        {typeof post.reactionCount === "number" && post.reactionCount > 0 && (
          <span className=" text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {post.reactionCount}
          </span>
        )}
      </button>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer flex items-center gap-1 text-gray-500 hover:text-teal-700 font-medium transition-colors focus:outline-none"
        aria-label="View comments"
        type="button"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">Comment</span>
        {post.comments && post.comments.length > 0 && (
          <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
            {post.comments.length}
          </span>
        )}
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 hover:shadow-md transition-shadow">
      {/* Student Info Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-semibold text-teal-800 text-xs">
          {getInitials(post.owner.firstName)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">{post.owner.firstName + " " + post.owner.lastName}</h4>
          <p className="text-xs text-gray-500">{post.createdAt}</p>
        </div>
      </div>

      {/* Topic */}
      <div 
        className="mb-3 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-base font-semibold text-gray-900">{post.topic}</h3>
      </div>

      {/* Content */}
      <div 
        className="mb-4 cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{post.content}</p>
      </div>

      {/* Actions: Reaction and Comment */}
      {renderActions()}
      
      {/* Post Modal */}
      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={post}
      />
    </div>
  );
};

export default PostCard;
