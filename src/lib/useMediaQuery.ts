import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    // 초기화 및 이벤트 리스너 등록
    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
};
