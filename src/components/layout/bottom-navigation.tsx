import {
  CalendarIcon,
  DiamondPlusIcon,
  HomeIcon,
  LucideIcon,
} from "lucide-react";

export const BottomNavigation: React.FC = () => {
  return (
    <div className="sticky bottom-0 left-0 w-full">
      <div className="flex w-full items-center justify-around border border-x-0 border-b-0 bg-black/50 py-4">
        <NavigationItem Icon={HomeIcon} label="홈" />
        <NavigationItem Icon={DiamondPlusIcon} label="추가" />
        <NavigationItem Icon={CalendarIcon} label="캘린더" />
      </div>
    </div>
  );
};

interface NavigationItemProps {
  Icon: LucideIcon;
  label: string;
}
const NavigationItem: React.FC<NavigationItemProps> = ({ Icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Icon size={28} />
      <span className="text-xs">{label}</span>
    </div>
  );
};
