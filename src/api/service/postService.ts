import extractPathFromUrl from "@/hook/extract/extractPathFromUrl";
import { db, storage } from "@/lib/db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { PostModel } from "../model/postModel";

const COLLECTION_NAME = "posts";

/** 포스트 추가 */
export async function addPost(data: PostModel) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
  return docRef.id;
}
/** 첫 로드 시 포스트 가져오기 */
export async function getInitialPosts(): Promise<QueryDocumentSnapshot[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
    limit(10),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs;
}
/** 포스트 더보기 가져오기 */
export async function getMorePosts(
  lastDoc: QueryDocumentSnapshot,
): Promise<QueryDocumentSnapshot[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
    startAfter(lastDoc),
    limit(10),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs;
}
/** 포스트 삭제 */
export async function deletePost(post: PostModel) {
  for (const img of post.images) {
    const path = extractPathFromUrl(img.url);
    if (path) {
      try {
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }
  }

  if (post.id) {
    await deleteDoc(doc(db, COLLECTION_NAME, post.id));
  }
}
