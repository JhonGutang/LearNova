"use client";

import React, { useState } from "react";
import SidebarLayout from "@/shared/layout/Sidebar";
import CreatePostModal from "./CreatePostModal";
import FloatingActionButton from "./FloatingActionButton";
import PostList from "./PostList";
import { CommunityPost, CreatePostData } from "@/types/community";
import CommunityBanner from "@/features/ads/CommunityBanner";

const Community: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data for demonstration
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      studentName: "Alex Johnson",
      topic: "Best Study Techniques for Programming",
      content: "I've been struggling with learning new programming concepts lately. Does anyone have any effective study techniques they'd like to share? I'm particularly interested in how you break down complex topics and practice coding problems.",
      createdAt: new Date("2024-01-15T10:30:00"),
      reactions: {
        likes: 12,
        dislikes: 1,
        comments: 5
      },
      userReactions: {
        liked: false,
        disliked: false
      }
    },
    {
      id: "2",
      studentName: "Sarah Chen",
      topic: "Group Project Collaboration Tips",
      content: "Working on my first group project and it's been challenging to coordinate with team members. What tools and strategies do you use to manage group projects effectively? Any advice for someone new to collaborative coding?",
      createdAt: new Date("2024-01-14T15:45:00"),
      reactions: {
        likes: 8,
        dislikes: 0,
        comments: 3
      },
      userReactions: {
        liked: true,
        disliked: false
      }
    },
    {
      id: "3",
      studentName: "Mike Rodriguez",
      topic: "Career Path in Web Development",
      content: "I'm a recent graduate looking to break into web development. Should I focus on frontend, backend, or full-stack development? What are the current market trends and which skills are most in demand right now?",
      createdAt: new Date("2024-01-13T09:20:00"),
      reactions: {
        likes: 15,
        dislikes: 2,
        comments: 8
      },
      userReactions: {
        liked: false,
        disliked: false
      }
    }
  ]);

  const handleCreatePost = (data: CreatePostData) => {
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      studentName: "Current User", // In a real app, this would come from authentication
      topic: data.topic,
      content: data.content,
      createdAt: new Date(),
      reactions: {
        likes: 0,
        dislikes: 0,
        comments: 0
      },
      userReactions: {
        liked: false,
        disliked: false
      }
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReact = (postId: string, reactionType: 'like' | 'dislike') => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newPost = { ...post };
          
          if (reactionType === 'like') {
            if (post.userReactions.liked) {
              // Remove like
              newPost.reactions.likes -= 1;
              newPost.userReactions.liked = false;
            } else {
              // Add like, remove dislike if exists
              newPost.reactions.likes += 1;
              newPost.userReactions.liked = true;
              
              if (post.userReactions.disliked) {
                newPost.reactions.dislikes -= 1;
                newPost.userReactions.disliked = false;
              }
            }
          } else if (reactionType === 'dislike') {
            if (post.userReactions.disliked) {
              // Remove dislike
              newPost.reactions.dislikes -= 1;
              newPost.userReactions.disliked = false;
            } else {
              // Add dislike, remove like if exists
              newPost.reactions.dislikes += 1;
              newPost.userReactions.disliked = true;
              
              if (post.userReactions.liked) {
                newPost.reactions.likes -= 1;
                newPost.userReactions.liked = false;
              }
            }
          }
          
          return newPost;
        }
        return post;
      })
    );
  };

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="mb-8">
          <CommunityBanner />
        </div>

        <PostList posts={posts} onReact={handleReact} />
      </div>
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleOpenModal} />
      
      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreatePost}
      />
    </SidebarLayout>
  );
};

export default Community;
