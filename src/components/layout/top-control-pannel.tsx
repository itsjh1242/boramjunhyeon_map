import { getTimeDiff } from "@/hook/date/d-day";
import Config from "@/lib/config";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const TopControlPannel: React.FC = () => {
  const config = new Config();
  const [timePassed, setTimePassed] = useState(getTimeDiff(config.firstDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(getTimeDiff(config.firstDate));
    }, 1000); // 매초 갱신

    return () => clearInterval(timer); // 언마운트 시 정리
  }, [config.firstDate]);

  return (
    <div className="sticky left-0 top-0 z-10 w-full">
      <div className="flex w-full items-center justify-between border border-x-0 border-t-0 bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
        {/* Icons */}
        <ControlPannelContainer>
          <div className="flex items-center space-x-1">
            <p>준현</p>
            <HeartIcon size={14} className="text-transparent" fill="red" />
            <p>보람</p>
          </div>
        </ControlPannelContainer>
        {/* Day after */}
        <ControlPannelContainer>
          <p>{`${timePassed.days}일`}</p>
          <p>{`${timePassed.hours}시간`}</p>
          <p>{`${timePassed.minutes}분`}</p>
          <p>{`${timePassed.seconds}초`}</p>
        </ControlPannelContainer>
      </div>
    </div>
  );
};

interface ControlPannelContainerProps {
  children: React.ReactNode;
}
const ControlPannelContainer: React.FC<ControlPannelContainerProps> = ({
  children,
}) => {
  return <div className="flex items-center space-x-2 text-xs">{children}</div>;
};
