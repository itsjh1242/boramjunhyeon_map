import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";

export const Landing: React.FC = () => {
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <section className="w-screen min-h-screen flex flex-col justify-center items-center">
        <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={(value) => setPassword(value)}>
          <InputOTPGroup>
            {[0, 1, 2, 3].map((index) => (
              <InputOTPSlot key={index} index={index} className="w-20 h-20" />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator className="opacity-50" />
          <InputOTPGroup>
            {[4, 5, 6, 7].map((index) => (
              <InputOTPSlot key={index} index={index} className="w-20 h-20" />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="mt-4">
          <p className="text-gray-400">Enter your private password to unlock this page</p>
        </div>
      </section>
    </>
  );
};
