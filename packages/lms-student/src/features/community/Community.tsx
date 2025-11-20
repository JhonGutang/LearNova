"use client";

import React, { useState } from "react";
import SidebarLayout from "@/shared/layout/Sidebar";
import CreatePostModal from "./components/CreatePostModal";
import FloatingActionButton from "./components/FloatingActionButton";
import PostList from "./components/PostList";
import CommunityBanner from "@/features/ads/CommunityBanner";
import { usePosts } from "./usePost";
import { CreatePostData } from "@lms/shared-types";

const Community: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { posts, handleCreatePost } = usePosts();

  const handleSubmitPost = async (data: CreatePostData) => {
    try {
      await handleCreatePost(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="mb-8">
          <CommunityBanner />
        </div>
        <PostList posts={posts} />
      </div>
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPost}
      />
    </SidebarLayout>
  );
};

export default Community;
