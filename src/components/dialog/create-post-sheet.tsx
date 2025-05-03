import { PostModel } from "@/api/model/postModel";
import { addPost } from "@/api/service/postService";
import { uploadImages } from "@/api/service/uploadService";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ImageWithUUID } from "@/schema/image";
import { AddressData } from "@/schema/kakao-addr";
import { usePostStore } from "@/stores/usePostStore";
import { ko } from "date-fns/locale";
import { XIcon } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { SortableImages } from "../layout/sortable-image";
import { useKakaoAddr } from "../use-kakao-addr";

interface CreatePostSheetProps {
  children: React.ReactNode;
}
export const CreatePostSheet: React.FC<CreatePostSheetProps> = ({
  children,
}) => {
  const { addPostAction } = usePostStore();

  const [images, setImages] = useState<ImageWithUUID[]>([]);
  const [location, setLocation] = useState<string>("");
  const [address, setAddress] = useState<AddressData>();
  const [date, setDate] = useState<Date>();
  const [context, setContext] = useState<string>("");

  const { openKakaoSearch } = useKakaoAddr({ setLocation, setAddress });

  const onClose = () => {
    setImages([]);
    setLocation("");
    setAddress(undefined);
    setDate(undefined);
    setContext("");
  };

  const handleSubmit = async () => {
    /**
     * @description validate
     */
    if (!images.length) {
      toast.error("사진을 선택해주세요.");
      return;
    }
    if (!location) {
      toast.error("위치를 선택해주세요.");
      return;
    }
    if (!date) {
      toast.error("날짜를 선택해주세요.");
      return;
    }
    if (!context) {
      toast.error("게시물 설명을 입력해주세요.");
      return;
    }
    if (!address) {
      toast.error("주소를 선택해주세요.");
      return;
    }
    if (!context) {
      toast.error("게시물 설명을 입력해주세요.");
      return;
    }

    try {
      const uploaded = await uploadImages(images);
      const form: PostModel = {
        images: uploaded,
        location: location,
        address: address,
        date: date,
        description: context,
        createdAt: new globalThis.Date(),
      };

      const res = await addPost(form);

      if (res) {
        const newPost: PostModel = { ...form, id: res };
        addPostAction(newPost);

        toast.success("게시물이 생성되었습니다.");
        onClose();
      }
    } catch (error) {
      console.error("Error on create post:", error);
      toast.error("게시물 생성에 실패했습니다.");
    }
  };

  return (
    <Sheet onOpenChange={onClose}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="m-auto flex h-full max-h-[100vh] min-h-0 max-w-[430px] flex-col overflow-hidden p-0 pb-6"
      >
        <SheetHeader className="sticky top-0 z-10 bg-background p-6">
          <SheetTitle className="">
            <div className="flex w-full items-center justify-between">
              <p>새 게시물</p>
              <SheetClose asChild>
                <XIcon size={18} className="cursor-pointer" />
              </SheetClose>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="flex h-full min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-2">
          <Images images={images} setImages={setImages} />
          <Location
            location={location}
            setLocation={setLocation}
            address={address}
            openKakaoSearch={openKakaoSearch}
          />
          <Date date={date} setDate={setDate} />
          <Context context={context} setContext={setContext} />
        </div>

        <SheetFooter className="px-2">
          <SheetClose asChild>
            <Button className="w-full" onClick={handleSubmit}>
              저장
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

interface LocationProps {
  location: string;
  setLocation: React.Dispatch<SetStateAction<string>>;
  address: AddressData | undefined;
  openKakaoSearch: () => void;
}
const Location: React.FC<LocationProps> = ({
  location,
  setLocation,
  address,
  openKakaoSearch,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="어디에서 찍은 사진인가요?"
        />
        <Button onClick={openKakaoSearch}>정확한 위치 추가</Button>
      </div>
      <p className="text-xs">{address && address.address}</p>
    </div>
  );
};

interface DateProps {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
}
const Date: React.FC<DateProps> = ({ date, setDate }) => {
  const [open, setOpen] = useState(false);
  const handleDateChange = () => {
    if (date) return;
    setOpen(!open);
  };

  useEffect(() => {
    if (date) {
      setOpen(false);
    }
  }, [date]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <Input
        readOnly
        value={date ? date.toLocaleDateString() : "날짜를 선택해주세요"}
        className={`${date ? "text-foreground" : "text-muted-foreground"}`}
        onClick={handleDateChange}
      />
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
        locale={ko}
        className={`absolute left-2 top-2 z-50 bg-black ${open ? "block" : "hidden"} `}
      />
      <Button
        variant="link"
        onClick={handleDateChange}
        className={`w-fit self-end ${date ? "visible" : "invisible"}`}
      >
        날짜 변경
      </Button>
    </div>
  );
};

interface ImagesProps {
  images: ImageWithUUID[];
  setImages: React.Dispatch<SetStateAction<ImageWithUUID[]>>;
}
const Images: React.FC<ImagesProps> = ({ images, setImages }) => {
  return <SortableImages images={images} setImages={setImages} />;
};

interface ContextProps {
  context: string;
  setContext: React.Dispatch<SetStateAction<string>>;
}
const Context: React.FC<ContextProps> = ({ context, setContext }) => {
  return (
    <Textarea
      value={context}
      onChange={(e) => setContext(e.target.value)}
      placeholder="어떤 사진인가요?"
      className="h-[200px] min-h-[200px] resize-none rounded-none border-x-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
    ></Textarea>
  );
};
