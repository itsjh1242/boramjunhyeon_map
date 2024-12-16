export const getNextMonth = (focusedMonth: string) => {
  // 연도와 월 분리
  const year = parseInt(focusedMonth.slice(0, 4), 10); // "2024" -> 2024
  const month = parseInt(focusedMonth.slice(4, 6), 10); // "08" -> 8

  // 다음 달 계산
  const nextMonth = month === 12 ? 1 : month + 1; // 12월이면 다음 달은 1월
  const nextYear = month === 12 ? year + 1 : year; // 12월이면 연도를 증가

  // 연도와 월 조합 (월은 항상 두 자리)
  return `${nextYear}${nextMonth.toString().padStart(2, "0")}`;
};
