import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <>
      <main className="m-auto flex h-full min-h-screen w-full justify-between">
        {/* Left */}
        <div className="flex-1 bg-white"></div>
        <div className="w-full max-w-[430px] flex-grow flex-col border border-y-0 shadow-2xl">
          <Outlet />
        </div>
        {/* Right */}
        <div className="flex-1 bg-white"></div>
      </main>
      <Toaster />
    </>
  );
};

export default RootLayout;
