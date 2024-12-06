import { db } from "@/lib/db";
import { doc, getDoc } from "firebase/firestore";

export const doc_secure_default = doc(db, "secure", "default");
export const snap_secure_default = async () => {
  try {
    return await getDoc(doc_secure_default);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

