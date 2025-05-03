import { PostModel } from "@/api/model/postModel";
import { deletePost } from "@/api/service/postService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGlobalStore } from "@/stores/useGlobalStore";
import { usePostStore } from "@/stores/usePostStore";
import { toast } from "sonner";

interface DeletePostAlertProps {
  post: PostModel;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const DeletePostAlert: React.FC<DeletePostAlertProps> = ({
  post,
  open,
  setOpen,
}) => {
  const { deletePostAction } = usePostStore();
  const { setGlobalLoading } = useGlobalStore();

  /** 포스트 삭제 로직 */
  const handleDeletePost = async () => {
    if (!post) return toast.error("삭제할 게시물이 없습니다.");
    try {
      setGlobalLoading(true);
      await deletePost(post);
      deletePostAction(post.id as string);
      toast.success("게시물이 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("게시물 삭제에 실패했습니다.");
    } finally {
      setGlobalLoading(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시물 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 이 게시물을 삭제하시겠습니까? <br />
            삭제된 게시물은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeletePost}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
