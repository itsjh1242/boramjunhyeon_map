import { snap_all_document_ids, snap_history, snap_oldest_document, snap_oldest_document_id } from "../model/history-model";

class HistoryService {
  getHistory = async (docId: string) => {
    try {
      const snap = await snap_history(docId);
      if (snap?.exists()) {
        return snap.data();
      } else {
        console.error("데이터가 없습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  getOldestDocument = async () => {
    return await snap_oldest_document();
  };

  getOldestDocumentId = async () => {
    return await snap_oldest_document_id();
  };

  getAllDocumentIds = async () => {
    return await snap_all_document_ids();
  };
}

export default new HistoryService();
