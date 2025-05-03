import { PostModel } from "@/api/model/postModel";
import { deletePost } from "@/api/service/postService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePostStore } from "@/stores/usePostStore";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface DropdownProps {
  post: PostModel;
}
export const Dropdown: React.FC<DropdownProps> = ({ post }) => {
  const { deletePostAction } = usePostStore();
  /** 포스트 삭제 로직 */
  const handleDeletePost = async () => {
    if (!post) return toast.error("삭제할 게시물이 없습니다.");
    try {
      await deletePost(post);
      deletePostAction(post.id as string);
      toast.success("게시물이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>게시물 관리</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PencilIcon />
            <span>수정</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeletePost}>
            <Trash2Icon />
            <span>삭제</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
