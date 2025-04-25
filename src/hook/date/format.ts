import { Timestamp } from "firebase/firestore";

export function formatKoreanDate(raw: string | Date | Timestamp): string {
  let date: Date;

  if (raw instanceof Timestamp) {
    date = raw.toDate();
  } else if (typeof raw === "string") {
    date = new Date(raw);
  } else if (raw instanceof Date) {
    date = raw;
  } else {
    return "날짜 오류";
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month.toString()}월 ${day.toString()}일`;
}
