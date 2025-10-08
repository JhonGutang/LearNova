"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { CommunityPost } from "@/types/community";

interface PostCardProps {
  post: CommunityPost;
  onReact: (postId: string, reactionType: 'like' | 'dislike') => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onReact }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

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
          {getInitials(post.studentName)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{post.studentName}</h4>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
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

      {/* Reaction Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReact(post.id, 'like')}
          className={`flex items-center gap-2 ${
            post.userReactions.liked 
              ? 'text-teal-600 bg-teal-50' 
              : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions.likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReact(post.id, 'dislike')}
          className={`flex items-center gap-2 ${
            post.userReactions.disliked 
              ? 'text-red-600 bg-red-50' 
              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions.dislikes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.reactions.comments}</span>
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
