import Config from "@/lib/config";
// components
import { AlertBanner } from "./alert_banner";

export const HomeMain = () => {
  return (
    <>
      <section className="bg-black">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full h-screen p-[24px] flex flex-col justify-between items-center gap-[24px]">
          <CenterDate />
          {/* <div className="flex justify-around items-center w-full">
            <Profile name="김준현" imgName="profile_junhyeon" birth="1999.11.04" />
            <HeartIcon size={32} color="red" fill="red" />
            <Profile name="이보람" imgName="profile_boram" birth="1998.07.14" />
          </div> */}
          <div className="flex flex-col w-full">
            <p className="text-[32px] font-bold text-white">LeeBoRam,</p>
            <p className="text-[32px] font-bold text-white">KimJunHyeon</p>
          </div>
        </header>
        {/* bg */}
        <div className="h-screen w-full">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/boramjunhyeonmap.firebasestorage.app/o/background%2Fmain_iphone_double.png?alt=media&token=37cccae4-3245-4ccb-ab0f-faf3d2386be0"
            alt="main_iphone"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
};

const CenterDate = () => {
  const settings = new Config();
  return (
    <div className="w-full flex flex-col justify-center items-center text-center gap-[12px] flex-wrap">
      <AlertBanner
        top_date={`${settings.daysFromFirstMeet().toLocaleString()}일 전`}
        icon_src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png"
        title="첫 만남"
        text="우리가 처음 마주한 순간"
        img_src="https://firebasestorage.googleapis.com/v0/b/boramjunhyeonmap.firebasestorage.app/o/banner%2Fmain_banner_1.jpg?alt=media&token=6036fe05-2a07-4374-b1e8-93cff1514375"
      />
      <AlertBanner
        top_date={`${settings.daysFromFirstDate().toLocaleString()}일 째`}
        icon_src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png"
        title="함께한 지"
        text="손 잡은 날부터 지금까지"
        img_src="https://firebasestorage.googleapis.com/v0/b/boramjunhyeonmap.firebasestorage.app/o/banner%2Fmain_banner_2.jpg?alt=media&token=98c3bf4f-46c9-4348-a155-7687491da003"
      />
    </div>
  );
};
