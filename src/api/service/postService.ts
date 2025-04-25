import { db } from "@/lib/db";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { PostModel } from "../model/postModel";

const COLLECTION_NAME = "posts";

export async function addPost(data: PostModel) {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
  return docRef.id;
}

export async function getInitialPosts(): Promise<QueryDocumentSnapshot[]> {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("createdAt", "desc"),
    limit(10),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs;
}

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
