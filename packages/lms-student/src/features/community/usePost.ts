import * as ApolloReact from "@apollo/client/react";
import { POSTS_QUERY, CREATE_POST_MUTATION, REACT_POST_MUTATION, CREATE_COMMENT_MUTATION } from "./query";
import { Post, ReactPostInput, Comment, CreatePostData } from "@lms/shared-types";
import { CustomToast } from "@/shared/CustomToast";

interface PostsQueryData {
  posts: Post[];
}

interface CreatePostMutationData {
  createPost: Post;
}

interface ReactPostMutationData {
  reactPost: {
    message: string;
    type: string;
  };
}

interface CreateCommentMutationData {
  createComment: {
    status: string;
    message: string;
    comment: Comment;
  };
}

export function usePosts() {
  const { data, refetch } = ApolloReact.useQuery<PostsQueryData>(POSTS_QUERY);
  const [createPostMutation] = ApolloReact.useMutation<CreatePostMutationData, { input: CreatePostData }>(CREATE_POST_MUTATION);
  const [createCommentMutation] = ApolloReact.useMutation<CreateCommentMutationData, { comment: string; postId: string }>(CREATE_COMMENT_MUTATION);

  const [reactPostMutation] = ApolloReact.useMutation<ReactPostMutationData, { input: ReactPostInput }>(REACT_POST_MUTATION);

  const handleReactPost = async (postId: string, isLiked: boolean) => {
    await reactPostMutation({ variables: { input: { postId, isLiked } } });
    await refetch();
    CustomToast({
      type: "success",
      description: isLiked ? "You liked the post!" : "You unliked the post!"
    });
  };

  const handleCreatePost = async (input: CreatePostData) => {
    await createPostMutation({ variables: { input } });
    await refetch();
    CustomToast({
      type: "success",
      description: "Post created successfully!"
    });
  };

  const handleCreateComment = async (comment: string, postId: string) => {
    try {
      const result = await createCommentMutation({ 
        variables: { comment, postId },
        update: (cache, { data }) => {
          if (data?.createComment.status === "SUCCESS" && data.createComment.comment) {
            // Update the cache to include the new comment
            const existingPosts = cache.readQuery<PostsQueryData>({ query: POSTS_QUERY });
            if (existingPosts) {
              const updatedPosts = existingPosts.posts.map(post => {
                if (post.id === postId) {
                  return {
                    ...post,
                    comments: [...(post.comments || []), data.createComment.comment]
                  };
                }
                return post;
              });
              
              cache.writeQuery({
                query: POSTS_QUERY,
                data: { posts: updatedPosts }
              });
            }
          }
        }
      });
      
      if (result.data?.createComment.status === "SUCCESS") {
        CustomToast({
          type: "success",
          description: "Comment added successfully!"
        });
        return result.data.createComment.comment;
      } else {
        CustomToast({
          type: "error",
          description: result.data?.createComment.message || "Failed to add comment"
        });
        return null;
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
      CustomToast({
        type: "error",
        description: "Failed to add comment"
      });
      return null;
    }
  };

  return {
    posts: data?.posts ?? [],
    handleCreatePost,
    handleReactPost,
    handleCreateComment,
  };
}
