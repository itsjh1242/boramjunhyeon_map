import { snap_history } from "../model/history-model";

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
}

export default new HistoryService();
