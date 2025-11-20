"use client";

import React, { useState } from "react";
import { Post } from "@lms/shared-types";
import { MessageCircle, Heart } from "lucide-react";
import { usePosts } from "../usePost";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, post }) => {
  const { handleReactPost, handleCreateComment } = usePosts();
  const [isLoving, setIsLoving] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState("");

  if (!isOpen || !post) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Love (like) handler
  const handleLove = async () => {
    if (isLoving) return;
    setIsLoving(true);
    try {
      await handleReactPost(post.id, !post.hasLiked);
    } catch (error) {
      console.error("Failed to react to post:", error);
    } finally {
      setIsLoving(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isCommenting || !post) return;
    
    setIsCommenting(true);
    try {
      await handleCreateComment(commentText.trim(), post.id);
      setCommentText("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsCommenting(false);
    }
  };

  // Love summary, replace reactions summary
  const loveCount = typeof post.reactionCount === "number" ? post.reactionCount : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg font-semibold text-gray-900">Post</DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Post Content */}
            <div className="p-4 border-b">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-semibold text-teal-800 text-sm">
                  {getInitials(post.owner.firstName)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {post.owner.firstName} {post.owner.lastName}
                  </h4>
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

              {/* Love Summary */}
              {loveCount > 0 && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-white border border-white flex items-center justify-center text-teal-500">
                      <Heart className="w-4 h-4" fill="#14b8a6" />
                    </div>
                  </div>
                  <span>{loveCount} loves</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t pt-3">
                <button
                  onClick={handleLove}
                  className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors flex-1 justify-center ${
                    post.hasLiked 
                      ? 'text-teal-600 bg-teal-50 hover:bg-teal-100' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  disabled={isLoving}
                >
                  <Heart 
                    className="w-5 h-5" 
                    fill={post.hasLiked ? "#0d9488" : "none"} // teal-700 when loved
                    stroke={post.hasLiked ? "#0d9488" : "currentColor"}
                  />
                  <span>Love</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors flex-1 justify-center">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">{post.comments?.length || 0} Comments</h3>
              
              {/* Comment Input */}
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 text-xs">
                  U
                </div>
                <form onSubmit={handleCommentSubmit} className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!commentText.trim() || isCommenting}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isCommenting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 text-xs">
                        {getInitials(comment.owner)}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-800 text-sm">
                              {comment.owner}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
