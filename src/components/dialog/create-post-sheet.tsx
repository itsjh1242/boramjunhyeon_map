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
import { ko } from "date-fns/locale";
import { XIcon } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";
import { SortableImages } from "../layout/sortable-image";
import { useKakaoAddr } from "../use-kakao-addr";

interface CreatePostSheetProps {
  children: React.ReactNode;
}
export const CreatePostSheet: React.FC<CreatePostSheetProps> = ({
  children,
}) => {
  const [addr, setAddr] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [context, setContext] = useState<string>("");

  const { openKakaoSearch } = useKakaoAddr({ setAddr });

  const onClose = () => {
    setAddr("");
    setDate(undefined);
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
          <Images />
          <Location addr={addr} openKakaoSearch={openKakaoSearch} />
          <Date date={date} setDate={setDate} />
          <Context context={context} setContext={setContext} />
        </div>

        <SheetFooter className="px-2">
          <SheetClose asChild>
            <Button className="w-full">저장</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

interface LocationProps {
  addr: string;
  openKakaoSearch: () => void;
}
const Location: React.FC<LocationProps> = ({ addr, openKakaoSearch }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          readOnly
          defaultValue={addr}
          placeholder="어디에서 찍은 사진인가요?"
          onClick={openKakaoSearch}
        />
      </div>
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

const Images: React.FC = () => {
  const [images, setImages] = useState<ImageWithUUID[]>([]);

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
