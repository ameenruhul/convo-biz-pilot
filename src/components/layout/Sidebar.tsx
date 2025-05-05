
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  MessageSquare, 
  Book, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  userRole: "admin" | "superadmin";
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="rounded-full shadow-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-full bg-sidebar shadow-md z-40 transition-all duration-300",
          isOpen ? "w-64" : "w-0 md:w-16",
          "flex flex-col"
        )}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {isOpen ? (
            <h2 className="font-bold text-lg text-brand-600">ConvoBiz Pilot</h2>
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold mx-auto">
              C
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          <NavItem to="/dashboard" icon={<BarChart3 size={20} />} label="Dashboard" isOpen={isOpen} />
          <NavItem to="/conversations" icon={<MessageSquare size={20} />} label="Conversations" isOpen={isOpen} />
          <NavItem to="/knowledge" icon={<Book size={20} />} label="Knowledge Base" isOpen={isOpen} />
          <NavItem to="/customers" icon={<Users size={20} />} label="Customers" isOpen={isOpen} />
          <NavItem to="/orders" icon={<Package size={20} />} label="Orders" isOpen={isOpen} />
          
          {userRole === "superadmin" && (
            <div className="pt-2 mt-2 border-t border-sidebar-border">
              <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />
            </div>
          )}
        </nav>

        <div className="p-3 border-t border-sidebar-border mt-auto">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50",
              !isOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const NavItem = ({ to, icon, label, isOpen }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "sidebar-item",
          isActive ? "active" : "",
          !isOpen && "justify-center"
        )
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
