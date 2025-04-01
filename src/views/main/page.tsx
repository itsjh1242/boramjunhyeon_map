import { Background } from "./background";
import { Dday } from "./d-day";

export const MainPage: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-between py-10">
        {/* Background */}
        <Background />
        {/* D-Day Counter */}
        <Dday />
      </div>
    </>
  );
};
