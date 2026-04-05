import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, Briefcase, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Articles", href: "/admin/articles", icon: FileText },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
  ];

  const NavLinks = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            data-testid={`admin-nav-${item.label.toLowerCase()}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-[100dvh] flex bg-gray-50 text-gray-900 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1a1a2e] text-white border-r border-gray-800">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 font-orbitron font-bold text-xl tracking-tight text-white">
            <span className="text-primary">GUYZ</span> MAKER <span className="text-xs text-gray-400 font-sans tracking-normal ml-1">ADMIN</span>
          </Link>
        </div>
        <div className="flex-1 px-4 py-2">
          <NavLinks />
        </div>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-[#1a1a2e] text-white">
          <Link href="/admin" className="font-orbitron font-bold text-lg">
            GUYZ MAKER
          </Link>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#1a1a2e] text-white border-r-gray-800 p-0">
              <div className="p-6">
                <span className="font-orbitron font-bold text-xl tracking-tight text-white">
                  <span className="text-primary">GUYZ</span> MAKER
                </span>
              </div>
              <div className="px-4 py-2">
                <NavLinks />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white">
                  <LogOut className="w-5 h-5" />
                  Exit Admin
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
