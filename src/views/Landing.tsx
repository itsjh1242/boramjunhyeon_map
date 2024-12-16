import { isAuthorized } from "@/api/hook/secure-hook";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useDeviceType } from "@/lib/useMediaQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";

import { MainPage } from "@/views/index";

export const Landing: React.FC = () => {
  const isMobile = useDeviceType();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [password, setPassword] = useState<string>("");
  const [hasLogined, setHasLogined] = useState<boolean>(false);

  useEffect(() => {
    if (password.length !== 8) return;
    console.log(password);
    const verify = async () => {
      const result = await isAuthorized(password);
      if (result) {
        login();
        setHasLogined(true);
      }
    };

    verify();
  }, [login, password]);

  if (!isAuthenticated)
    return (
      <>
        <section className="w-full max-w-[500px] min-h-screen flex flex-col justify-center items-center m-auto ">
          <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(value) => setPassword(value)} value={password}>
            <InputOTPGroup>
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={`w-[40px] h-[40px] transition duration-300 ${isMobile && "w-10 h-10"} ${hasLogined && "text-green-400"}`}
                />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator className="opacity-50" />
            <InputOTPGroup>
              {[4, 5, 6, 7].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={`w-[40px] h-[40px] transition duration-300 ${isMobile && "w-10 h-10"} ${hasLogined && "text-green-400"}`}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="mt-4">
            <p className="text-gray-400">Enter your private password to unlock this page</p>
          </div>
        </section>
      </>
    );

  return <MainPage />;
};
