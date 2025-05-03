import { usePaginatedPosts } from "@/api/hook/postHook";
import { InstagramPost } from "@/components/layout/post/post";

export const MainPage: React.FC = () => {
  const { posts } = usePaginatedPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div>
          <p>불러올 데이터 없음</p>
          <p className="text-sm text-gray-500">게시물을 추가해주세요</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="relative flex flex-col items-center justify-between gap-10 py-2">
        {posts.map((post, index) => {
          return <InstagramPost key={`${post.id}-${index}`} post={post} />;
        })}
      </div>
    </>
  );
};
