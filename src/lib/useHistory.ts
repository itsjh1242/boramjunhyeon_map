import HistoryService from "@/api/service/history-service";
import { useEffect, useState } from "react";

// HistoryItemModel: 개별 기록의 데이터 구조
export interface HistoryItemModel {
  [id: string]: { content: string; location: string };
}

const useHistory = () => {
  // 월별 데이터를 관리하는 상태
  const [history, setHistory] = useState<{
    [month: string]: { [date: string]: HistoryItemModel }[];
  }>({});

  useEffect(() => {
    fetchOldestHistory();
  }, []);

  const fetchOldestHistory = async () => {
    try {
      const documentId = "202408"; // 월별 ID
      const fetchedHistory = await HistoryService.getHistory(documentId);

      if (fetchedHistory && Object.keys(fetchedHistory).length > 0) {
        // 월별 데이터로 변환
        const updatedHistory = Object.entries(fetchedHistory).reduce((acc, [dateKey, item]) => {
          const monthKey = dateKey.slice(0, 6); // "202408" 등 월별 키 추출

          // 월 키가 없으면 초기화
          if (!acc[monthKey]) {
            acc[monthKey] = [];
          }

          // 월 키에 날짜 데이터를 추가
          acc[monthKey].push({ [dateKey]: item });
          return acc;
        }, {} as { [month: string]: { [date: string]: HistoryItemModel }[] });

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
