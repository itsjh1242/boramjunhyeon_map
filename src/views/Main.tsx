import Config from "@/lib/config";

export const MainPage: React.FC = () => {
  return (
    <section className="w-screen max-w-full h-svh">
      {/* header */}
      <header className="w-full h-fit p-[24px] flex justify-between items-center">
        {/* Profile - 준현 */}
        <Profile name="준현" imgName="profile_junhyeon" />
        {/* Center Date */}
        <CenterDate />
        {/* Profile - 보람 */}
        <Profile name="보람" imgName="profile_boram" />
      </header>
    </section>
  );
};

const Profile = (props: { name: string; imgName: string }) => {
  return (
    <div className="flex flex-col items-center gap-[8px]">
      <div className="rounded-full w-[50px] h-[50px] overflow-hidden shadow-lg">
        <img className="w-full h-full object-cover" src={`/image/profile/${props.imgName}.jpg`} />
      </div>
      <p>{props.name}</p>
    </div>
  );
};

const CenterDate = () => {
  const settings = new Config();
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div className="flex gap-[4px]">
        <p>첫 만남 이후</p>
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20with%20Arrow.png"
          alt="Heart with Arrow"
          width="24"
          height="24"
        />
        <p className="font-bold">{settings.daysFromFirstMeet()}</p>일
      </div>
      <div className="flex gap-[4px] self-end">
        <p>손잡은 지</p>
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Heart%20on%20Fire.png"
          alt="Heart on Fire"
          width="24"
          height="24"
        />
        <p className="font-bold">{settings.daysFromFirstDate()}</p>일
      </div>
    </div>
  );
};
