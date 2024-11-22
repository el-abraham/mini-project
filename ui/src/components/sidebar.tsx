import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar";
import { Beef, Utensils } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  const { isOpen } = useSidebarStore((state) => state);

  return (
    <div
      className={cn(
        "w-60 hidden fixed z-10 bg-white lg:static lg:block h-screen flex-0",
        isOpen ? "block" : "hidden"
      )}
    >
      <div className="px-4 h-16 text-center border-b flex items-center justify-center">
        <h3 className="text-2xl font-bold text-[#1D2939]">Makan Kuy!</h3>
      </div>
      <div className="p-4">
        <SidebarItem
          to="/dashboard"
          title="Dashboard"
          active={location.pathname === "/dashboard"}
          icon={<Utensils size={16} />}
        />
        {/* <SidebarItem
          to="/order-list"
          title="Order List"
          icon={<ScrollText size={16} />}
        /> */}
        <SidebarItem
          to="/dish"
          title="Manage Dish"
          active={location.pathname === "/dish"}
          icon={<Beef size={16} />}
        />
      </div>
    </div>
  );
}

type SidebarItemProps = {
  title: string;
  to: string;
  active?: boolean;
  icon?: React.ReactNode;
};

export function SidebarItem({ title, to, active, icon }: SidebarItemProps) {
  return (
    <>
      <Link to={to}>
        <li
          className={cn(
            "list-none px-3 py-1.5 font-medium  rounded-lg flex items-center space-x-2 mb-1.5",
            active ? "bg-[#1D2939] text-white" : ""
          )}
        >
          {icon}
          <span>{title}</span>
        </li>
      </Link>
    </>
  );
}
