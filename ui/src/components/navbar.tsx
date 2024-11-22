import { Calendar, LogOut, PanelRight } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { logout } from "@/actions/auth";
import { useSidebarStore } from "@/stores/sidebar";

export function Navbar() {
  const { toggle } = useSidebarStore((state) => state);

  return (
    <nav className="w-full flex items-center justify-between h-16 px-5 border-b">
      <div className=" flex space-x-3">
        <Card className="lg:hidden bg-white" onClick={toggle}>
          <CardContent className="p-2">
            <PanelRight size={20} />
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-0">
            <div className="rounded-lg text-sm flex items-center px-3 py-2 space-x-1 font-semibold">
              😄 Admin
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex space-x-3">
        <Card className="bg-white hidden sm:block">
          <CardContent className="p-0">
            <div className="rounded-lg text-sm flex items-center px-3 py-2 space-x-1">
              <Calendar size={16} />
              <span>
                {Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(Date.now())}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button onClick={logout} className="border rounded-lg py-2 px-2.5">
          <LogOut size={20} />
        </Button>
      </div>
    </nav>
  );
}
