"use client";

import React from "react";
import PostCard from "./PostCard";
import { CommunityPost } from "@/types/community";

interface PostListProps {
  posts: CommunityPost[];
  onReact: (postId: string, reactionType: 'like' | 'dislike') => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onReact }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No posts yet</h3>
        <p className="text-gray-500">Be the first to start a conversation in the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onReact={onReact} />
      ))}
    </div>
  );
};

export default PostList;
