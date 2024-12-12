import { db } from "@/lib/db";
import { doc, getDoc } from "firebase/firestore";

export const snap_history = async (docId: string) => {
  try {
    const docRef = doc(db, "history", docId);
    return await getDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};
