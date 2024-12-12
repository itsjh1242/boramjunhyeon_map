import HistoryService from "@/api/service/history-service";
import { useEffect, useState } from "react";

export interface HistoryItemModel {
  content: string;
}

const useHistory = () => {
  // 월별 데이터로 상태 관리
  const [history, setHistory] = useState<{
    [month: string]: { [date: string]: HistoryItemModel };
  }>({});

  useEffect(() => {
    fetchOldestHistory();
  }, []);

  const fetchOldestHistory = async () => {
    try {
      const documentId = "202408"; // 월별 ID
      const fetchedHistory = await HistoryService.getHistory(documentId);

      if (fetchedHistory && Object.keys(fetchedHistory).length > 0) {
        // 월별 데이터 구조로 변환
        const updatedHistory = Object.entries(fetchedHistory).reduce((acc, [dateKey, item]) => {
          const monthKey = dateKey.slice(0, 6); // "202408"
          if (!acc[monthKey]) {
            acc[monthKey] = {}; // 월 키 초기화
          }
          acc[monthKey][dateKey] = item; // 일별 데이터 추가
          return acc;
        }, {} as { [month: string]: { [date: string]: HistoryItemModel } });

        // 상태 업데이트
        setHistory((prev) => ({
          ...prev,
          ...updatedHistory,
        }));
      } else {
        console.warn("No history data available");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return {
    history,
  };
};

export default useHistory;
