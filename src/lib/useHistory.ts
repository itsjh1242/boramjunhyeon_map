import HistoryService from "@/api/service/history-service";
import { useEffect, useState } from "react";
import { getNextMonth } from "./helper";

// HistoryItemModel: 개별 기록의 데이터 구조
export interface HistoryItemModel {
  [id: string]: { content: string; location: string };
}

const useHistory = () => {
  // 월별 데이터를 관리하는 상태
  const [history, setHistory] = useState<{
    [month: string]: { [date: string]: HistoryItemModel }[];
  }>({});
  const [totalDocs, setTotalDocs] = useState<string[] | null>(null);
  const [focusedMonth, setFocusedMonth] = useState<string | null>(null);
  const [next, setNext] = useState<boolean>(false);
  const [nextMonth, setNextMonth] = useState<string | null>(null);

  useEffect(() => {
    fetchOldestHistory();
  }, []);

  const isLastDoc = (next: string) => {
    if (!totalDocs) return true;
    const lastDoc = totalDocs[totalDocs.length - 1];
    return lastDoc === next;
  };

  const fetchOldestHistory = async () => {
    try {
      // 전체 문서 아이디 배열 가져오기
      const fetchedTotalDocs = await HistoryService.getAllDocumentIds();
      if (!fetchedTotalDocs) return;

      const documentId = await HistoryService.getOldestDocumentId();
      const fetchedHistory = await HistoryService.getHistory(documentId!);

      // 다음 달 계산
      const next = getNextMonth(documentId!);
      const last = isLastDoc(next);

      setNextMonth(next);
      setNext(last);

      setTotalDocs(fetchedTotalDocs);
      setFocusedMonth(documentId);

      if (fetchedHistory && Object.keys(fetchedHistory).length > 0) {
        // 월별 데이터로 변환
        const updatedHistory = Object.entries(fetchedHistory).reduce((acc, [dateKey, item]) => {
          // 월 키가 없으면 초기화
          if (!acc[documentId!]) {
            acc[documentId!] = [];
          }

          // 월 키에 날짜 데이터를 추가
          acc[documentId!].push({ [dateKey]: item });
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

  const fetchNextHistory = async () => {
    try {
      if (!focusedMonth) return { next: null, last: false };

      // 다음 달 계산
      const next = getNextMonth(focusedMonth);

      // 다음 달의 데이터 가져오기
      const fetchedHistory = await HistoryService.getHistory(next);

      // totalDocs 배열이 비어있을 가능성 처리
      if (!totalDocs || totalDocs.length === 0) return { next, last: false };

      const last = isLastDoc(next);

      setNextMonth(next);
      setNext(!last);

      // fetchedHistory를 기존 history에 병합
      if (fetchedHistory && Object.keys(fetchedHistory).length > 0) {
        const updatedHistory = Object.entries(fetchedHistory).reduce((acc, [dateKey, item]) => {
          if (!acc[next]) {
            acc[next] = [];
          }

          acc[next].push({ [dateKey]: item });
          return acc;
        }, {} as { [month: string]: { [date: string]: HistoryItemModel }[] });

        setHistory((prev) => ({
          ...prev,
          ...updatedHistory,
        }));
      }

      // 상태 업데이트: 다음 달로 이동
      setFocusedMonth(next);

      return true;
    } catch (error) {
      console.error("Error in fetchNextHistory:", error);
      return { next: null, last: false }; // 에러 발생 시 기본 값 반환
    }
  };

  return {
    next,
    nextMonth,
    history,
    totalDocs,
    focusedMonth,
    fetchNextHistory,
  };
};

export default useHistory;
