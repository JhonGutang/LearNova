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

export interface CreatePostData {
  topic: string;
  content: string;
}
