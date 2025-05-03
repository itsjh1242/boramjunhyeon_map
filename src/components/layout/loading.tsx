import { useGlobalStore } from "@/stores/useGlobalStore";

export const GlobalLoading: React.FC = () => {
  const { globalLoading } = useGlobalStore();
  if (!globalLoading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
        <span className="animate-pulse text-sm font-medium text-white">
          잠시만 기다려주세요...
        </span>
      </div>
    </div>
  );
};
