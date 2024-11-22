import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { TokenService } from "@/lib/token";
import { useSidebarStore } from "@/stores/sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!TokenService.isAuthenticated) {
    window.location.href = "/login";
  }

  const { onOpenChange, isOpen } = useSidebarStore((state) => state);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        onClick={() => isOpen && onOpenChange(false)}
        className="bg-[#F9FAFB] min-h-screen flex-1"
      >
        <Navbar />
        {children}
      </div>
    </div>
  );
}
