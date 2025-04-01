import { getTimeDiff } from "@/hook/date/d-day";
import Config from "@/lib/config";
import { useEffect, useState } from "react";

export const Dday: React.FC = () => {
  const config = new Config();
  const [timePassed, setTimePassed] = useState(getTimeDiff(config.firstDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(getTimeDiff(config.firstDate));
    }, 1000); // 매초 갱신

    return () => clearInterval(timer); // 언마운트 시 정리
  }, [config.firstDate]);

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      {/* Day */}
      <p className="text-[72px] font-bold">
        {timePassed.days} <span className="text-base">일</span>
      </p>
      <div className="flex w-full items-center justify-around">
        {/* Hour */}
        <p className="text-[36px] font-bold">
          {timePassed.hours} <span className="text-base">시간</span>
        </p>
        {/* Minute */}
        <p className="text-[36px] font-bold">
          {timePassed.minutes} <span className="text-base">분</span>
        </p>
        {/* Second */}
        <p className="text-[36px] font-bold">
          {timePassed.seconds} <span className="text-base">초</span>
        </p>
      </div>
    </div>
  );
};
