// Post owner information
export interface PostOwner {
  id: string;
  firstName: string;
  lastName: string;
}

// Comment interface
export interface Comment {
  id: string;
  owner: string;
  comment: string;
}

// Post interface (used in student app)
export interface Post {
  id: string;
  owner: PostOwner;
  topic: string;
  content: string;
  hasLiked: boolean;
  createdAt: string;
  comments: Comment[];
  reactionCount: number;
}

// Community post (alternative structure)
export interface CommunityPost {
  id: string;
  studentName: string;
  topic: string;
  content: string;
  createdAt: Date;
  reactions: {
    likes: number;
    dislikes: number;
    comments: number;
  };
  userReactions: {
    liked: boolean;
    disliked: boolean;
  };
}

// Create post data
export interface CreatePostData {
  topic: string;
  content: string;
}

// React to post input
export interface ReactPostInput {
  postId: string;
  isLiked: boolean;
}

