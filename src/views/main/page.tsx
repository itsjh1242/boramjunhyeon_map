import { InstagramPost } from "@/components/layout/instagram-post";

export const MainPage: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-between py-2">
        <InstagramPost />
      </div>
    </>
  );
};
