import { usePaginatedPosts } from "@/api/hook/postHook";
import { InstagramPost } from "@/components/layout/instagram-post";

export const MainPage: React.FC = () => {
  const { posts } = usePaginatedPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
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
