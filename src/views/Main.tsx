import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import Config from "@/lib/config";
import useHistory, { HistoryItemModel } from "@/lib/useHistory";
import { motion } from "framer-motion";
import { HeartIcon, MapPinIcon, PackageOpenIcon } from "lucide-react";

export const MainPage: React.FC = () => {
  const { next, nextMonth, history, totalDocs, fetchNextHistory } = useHistory();

  const handleInfiniteScrollNext = async () => {
    await fetchNextHistory();
  };

  return (
    <section className="w-screen max-w-full min-h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="w-full h-[30%] p-[24px] flex flex-col justify-around items-center">
        <CenterDate />
        <div className="flex justify-around items-center w-full">
          <Profile name="준현🌻" imgName="profile_junhyeon" birth="1999.11.04" />
          <HeartIcon size={32} color="red" fill="red" />
          <Profile name="보람☀️" imgName="profile_boram" birth="1998.07.14" />
        </div>
      </header>

      {/* Main */}
      <div className="w-full flex-grow overflow-y-auto">
        {history && totalDocs ? (
          Object.entries(history).length > 0 ? (
            Object.entries(history).map(([month, items]) => (
              <div className="relative flex flex-col" key={month}>
                <div className="self-start flex flex-col gap-[6px] pl-[24px]">
                  <p className="font-bold break-keep">{month.slice(0, 4)}년</p>
                  <Separator className="bg-black w-[50%] py-[2px]" />
                </div>
                <MainSection key={month} pid={month} historyItems={items} />
              </div>
            ))
          ) : (
            <p className="text-center">No history available.</p>
          )
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
      <div className="mb-[100px]"></div>

      {/* Action Button */}
      <Drawer>
        <DrawerTrigger asChild>
          <motion.div className="w-fit h-fit p-4 m-4 rounded-full bg-blue-900 fixed right-0 bottom-0">
            <PackageOpenIcon color="white" />
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className="overflow-visible w-full max-w-screen-sm">
          <div>
            <DrawerHeader>
              <DrawerTitle>Boram, JunHyeon</DrawerTitle>
              <DrawerDescription>Love her but leave her wild</DrawerDescription>
            </DrawerHeader>
            <div className="w-full overflow-x-auto px-[15%]">
              <div className="flex gap-[24px] w-max">
                <DrawerItem
                  headerImgSrc={"https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Spiral%20Calendar.png"}
                  title="Calendar"
                  description="일정 공유, 메모"
                  phrase="Love recognizes no barriers"
                />
                <DrawerItem
                  headerImgSrc={"https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png"}
                  title="Map"
                  description="다녀온 곳, 가고 싶은 곳"
                  phrase="I think I'd miss you even if we never met."
                  phraseWidth="w-[150px]"
                />
                <DrawerItem
                  headerImgSrc={"https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"}
                  title="Anniversary"
                  description="소중한 날들"
                  phrase="Everything I do, I do it for you."
                  phraseWidth="w-[110px]"
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Load More Button */}
      {next && (
        <div className="w-fit fixed bottom-2 left-1/2 -translate-x-1/2">
          <p className="px-4 py-2 border-[1px] rounded-full" onClick={() => handleInfiniteScrollNext()}>
            {nextMonth && `${parseInt(nextMonth.slice(4, 6), 10)}월 보기`}
          </p>
        </div>
      )}
    </section>
  );
};

const MainSection: React.FC<{
  pid: string;
  historyItems: { [date: string]: HistoryItemModel }[];
}> = ({ pid, historyItems }) => {
  const year = pid.slice(0, 4); // "2024"
  const month = pid.slice(4, 6); // "08"

  return (
    <section className={`relative w-full h-fit flex flex-col justify-start items-center px-[24px]`}>
      {/* 중앙 레이아웃 */}
      <div className="relative flex flex-col justify-start items-center w-full">
        {/* 중앙 세로선 */}
        <Separator orientation="vertical" className="absolute top-0 left-1/2 -translate-x-1/2 bg-black h-full w-[2px]" />
        {/* 중앙 텍스트 */}
        <p className={`w-fit h-fit p-4 rounded-full outline outline-1 bg-white shadow-lg font-bold z-10`}>
          {new Date(`${year}-${month}`).toLocaleDateString("ko-KR", {
            month: "long",
          })}
        </p>

        {/* 날짜별 데이터 렌더링 */}
        {historyItems.map((item, index) =>
          Object.entries(item).map(([date, value], idx) => {
            const globalIndex = index * Object.keys(item).length + idx;
            const right = globalIndex % 2 === 0;

            return (
              <div
                key={`${pid}-${date}-${globalIndex}`}
                className={`relative flex flex-col w-[200px] mt-4 ${right ? "self-end text-right" : "self-start text-left"}`}
              >
                {/* 날짜 */}
                <p className={`text-gray-400 text-sm w-fit border-[1px] px-2 py-1 rounded-full ${right && "self-end"}`}>
                  {date.length === 8 ? `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6, 8)}` : "Invalid date"}
                </p>

                {/* 위치 */}
                {value.location && (
                  <div className={`flex items-center gap-1 mt-2 ${right && "self-end"}`}>
                    <MapPinIcon size={16} fill="black" color="white" />
                    <p className={`text-gray-700 text-base font-medium break-words `}>{typeof value.location === "string" ? value.location : null}</p>
                  </div>
                )}

                {/* 내용 */}
                <p className="mt-2 text-gray-800 text-sm break-words">{typeof value.content === "string" ? value.content : "Invalid content"}</p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

const Profile = (props: { name: string; imgName: string; birth: string }) => {
  return (
    <div className="flex flex-col items-center gap-[8px]">
      <div className="rounded-full w-[120px] h-[120px] overflow-hidden shadow-lg">
        <img className="w-full h-full object-cover" src={`/image/profile/${props.imgName}.jpg`} />
      </div>
      <div className="flex flex-col gap-0 items-center">
        <p>{props.name}</p>
        <p>{props.birth}</p>
      </div>
    </div>
  );
};

const CenterDate = () => {
  const settings = new Config();
  return (
    <div className="flex justify-center items-center text-center gap-[12px]">
      <div className="flex gap-[4px]">
        <Badge variant="default" className="flex justify-between items-center gap-[8px] px-3 py-1">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png"
            alt="Heart with Arrow"
            width="20"
            height="20"
          />
          <p>첫 만남</p>
          <p className="font-bold">{settings.daysFromFirstMeet().toLocaleString()}</p>일
        </Badge>
      </div>
      <div className="flex gap-[4px] self-end">
        <Badge variant="default" className="flex justify-between items-center gap-[8px] px-3 py-1">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png"
            alt="Heart on Fire"
            width="20"
            height="20"
          />
          <p>함께 한 지</p>
          <p className="font-bold">{settings.daysFromFirstDate().toLocaleString()}</p>일
        </Badge>
      </div>
    </div>
  );
};

interface DrawerItemProps {
  headerImgSrc?: string;
  title?: string;
  link?: string;
  description?: string;
  phrase?: string;
  phraseWidth?: string;
}
const DrawerItem: React.FC<DrawerItemProps> = ({ headerImgSrc, title, link, description, phrase, phraseWidth }) => {
  return (
    <div className="w-[300px] h-[150px] flex flex-col justify-between p-4 pb-0 border shadow-lg bg-secondary-foreground text-white">
      <div className="flex flex-col">
        {/* top */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[8px]">
            <img src={headerImgSrc} alt="headerImg" width="25" height="25" />
            <p className="text-[20px] font-bold">{title}</p>
          </div>
          <Button variant={"outline"} className="bg-transparent">
            이동
          </Button>
        </div>
        {/* description */}
        <p className="text-secondary">{description}</p>
      </div>
      {/* phrase */}
      <div className="w-full flex justify-end text-end break-words">
        <p className={`text-gray-400 w-[200px] ${phraseWidth}`}>{phrase}</p>
      </div>
    </div>
  );
};
