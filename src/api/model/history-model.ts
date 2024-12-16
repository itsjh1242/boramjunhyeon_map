import { db } from "@/lib/db";
import { collection, doc, documentId, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";

export const snap_history = async (docId: string) => {
  try {
    const docRef = doc(db, "history", docId);
    return await getDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};

export const snap_oldest_document_id = async () => {
  try {
    const historyCollection = collection(db, "history"); // history 컬렉션 참조
    const q = query(historyCollection, orderBy(documentId()), limit(1)); // 문서 ID 기준으로 정렬 후 첫 번째 문서 가져오기

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const oldestDocId = querySnapshot.docs[0].id; // 첫 번째 문서의 ID 가져오기
      return oldestDocId;
    } else {
      console.log("No documents found!");
      return null; // 빈 값 처리
    }
  } catch (error) {
    console.error("Error fetching oldest document ID:", error);
    return null; // 에러 발생 시 null 반환
  }
};

export const snap_all_document_ids = async () => {
  try {
    const historyCollection = collection(db, "history"); // history 컬렉션 참조
    const querySnapshot = await getDocs(historyCollection);

    if (!querySnapshot.empty) {
      const documentIds = querySnapshot.docs.map((doc) => doc.id); // 모든 문서 ID 추출
      return documentIds; // 문서 ID 배열 반환
    } else {
      console.log("No documents found!");
      return []; // 빈 배열 반환
    }
  } catch (error) {
    console.error("Error fetching all document IDs:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const snap_oldest_document = async () => {
  try {
    const historyCollection = collection(db, "history"); // history 컬렉션 참조
    const q = query(historyCollection, orderBy(documentId()), limit(1)); // 문서 ID 기준으로 정렬 후 첫 번째 문서 가져오기

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const oldestDoc = querySnapshot.docs[0];
      // 문서 데이터와 ID를 함께 반환
      return {
        id: oldestDoc.id,
        ...oldestDoc.data(),
      };
    } else {
      console.log("No documents found!");
      return null; // 빈 값 처리
    }
  } catch (error) {
    console.error("Error fetching oldest document:", error);
    return null; // 에러 발생 시 null 반환
  }
};
