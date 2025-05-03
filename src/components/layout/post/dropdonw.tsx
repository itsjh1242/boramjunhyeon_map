import { PostModel } from "@/api/model/postModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { DeletePostAlert } from "./deletePost";

interface DropdownProps {
  post: PostModel;
}
export const Dropdown: React.FC<DropdownProps> = ({ post }) => {
  const [deletePostAlertOpen, setDeletePostAlertOpen] = useState(false);
  return (
    <>
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
            <DropdownMenuItem onClick={() => setDeletePostAlertOpen(true)}>
              <Trash2Icon />
              <span>삭제</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* modal */}
      <DeletePostAlert
        post={post}
        open={deletePostAlertOpen}
        setOpen={setDeletePostAlertOpen}
      />
    </>
  );
};
