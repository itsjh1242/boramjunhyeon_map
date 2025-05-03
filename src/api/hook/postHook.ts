import { usePostStore } from "@/stores/usePostStore";
import { useMutation } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostModel } from "../model/postModel";
import {
  addPost,
  deletePost,
  getInitialPosts,
  getMorePosts,
} from "../service/postService";

export function usePaginatedPosts() {
  const { posts, setPosts } = usePostStore();

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getInitialPosts().then((docs) => {
      const data = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostModel[];
      setPosts(data);
      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === 10);
    });
  }, [setPosts]);

  const loadMore = async () => {
    if (!lastDoc) return;
    const docs = await getMorePosts(lastDoc);
    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PostModel[];

    setPosts([...posts, ...data]);
    setLastDoc(docs[docs.length - 1]);
    setHasMore(docs.length === 10);
  };

  return { posts, loadMore, hasMore };
}

export function useAddPost() {
  return useMutation({
    mutationFn: (data: PostModel) => addPost(data),
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: (post: PostModel) => deletePost(post),
  });
}
