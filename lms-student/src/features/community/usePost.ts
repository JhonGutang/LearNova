import * as ApolloReact from "@apollo/client/react";
import { POSTS_QUERY, CREATE_POST_MUTATION } from "./query";
import { Post } from "@/types/data";
import { CreatePostData } from "@/types/community";
import { CustomToast } from "@/shared/CustomToast";

interface PostsQueryData {
  posts: Post[];
}

interface CreatePostMutationData {
  createPost: Post;
}

export function usePosts() {
  const { data, refetch } = ApolloReact.useQuery<PostsQueryData>(POSTS_QUERY);
  const [createPostMutation] = ApolloReact.useMutation<CreatePostMutationData, { input: CreatePostData }>(CREATE_POST_MUTATION);

  const handleCreatePost = async (input: CreatePostData) => {
    await createPostMutation({ variables: { input } });
    await refetch();
    CustomToast({
      type: "success",
      title: "Success",
      description: "Post created successfully!"
    });
  };

  return {
    posts: data?.posts ?? [],
    handleCreatePost,
  };
}
