import {
  CalendarIcon,
  DiamondPlusIcon,
  HomeIcon,
  LucideIcon,
} from "lucide-react";
import { CreatePostSheet } from "../dialog/create-post-sheet";

export const BottomNavigation: React.FC = () => {
  return (
    <div className="sticky bottom-0 left-0 w-full">
      <div className="flex w-full items-center justify-around border border-x-0 border-b-0 bg-black py-2">
        <NavigationItem Icon={HomeIcon} label="홈" />
        <CreatePostSheet>
          <NavigationItem Icon={DiamondPlusIcon} label="추가" />
        </CreatePostSheet>
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
    <div className="flex cursor-pointer flex-col items-center justify-center gap-1">
      <Icon size={24} />
      <span className="text-xs">{label}</span>
    </div>
  );
};
