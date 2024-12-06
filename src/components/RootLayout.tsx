import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </>
  );
};

export default RootLayout;
