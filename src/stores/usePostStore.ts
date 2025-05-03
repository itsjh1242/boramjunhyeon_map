import { PostModel } from "@/api/model/postModel";
import { create } from "zustand";

interface PostStore {
  posts: PostModel[];
  setPosts: (data: PostModel[]) => void;
  addPostAction: (post: PostModel) => void;
  deletePostAction: (postId: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (data) => set({ posts: data }),
  addPostAction: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePostAction: (postId) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== postId),
    })),
}));
