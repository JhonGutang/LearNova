import * as ApolloReact from "@apollo/client/react";
import { POSTS_QUERY, CREATE_POST_MUTATION, REACT_POST_MUTATION } from "./query";
import { Post, ReactPostInput } from "@/types/data";
import { CreatePostData } from "@/types/community";
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

export function usePosts() {
  const { data, refetch } = ApolloReact.useQuery<PostsQueryData>(POSTS_QUERY);
  const [createPostMutation] = ApolloReact.useMutation<CreatePostMutationData, { input: CreatePostData }>(CREATE_POST_MUTATION);

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

  return {
    posts: data?.posts ?? [],
    handleCreatePost,
    handleReactPost,
  };
}
