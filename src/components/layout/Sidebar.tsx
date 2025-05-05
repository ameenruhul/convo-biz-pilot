
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Book, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Building,
  ShieldCheck,
  User,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  userRole: "admin" | "superadmin";
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

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
          className="rounded-full shadow-md bg-white"
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                SB
              </div>
              <h2 className="font-bold text-lg text-primary">Style Boutique</h2>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold mx-auto">
              SB
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

        <div className="p-2 border-b border-sidebar-border">
          {isOpen ? (
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=admin" alt="User Avatar" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate capitalize">{userRole}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=admin" alt="User Avatar" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          <div className="mb-4">
            <p className={cn("text-xs text-muted-foreground px-3 mb-2", !isOpen && "sr-only")}>Main</p>
            <NavItem to="/dashboard" icon={<BarChart3 size={20} />} label="Dashboard" isOpen={isOpen} />
            <NavItem to="/conversations" icon={<MessageSquare size={20} />} label="Conversations" isOpen={isOpen} />
            <NavItem to="/knowledge" icon={<Book size={20} />} label="Knowledge Base" isOpen={isOpen} />
            <NavItem to="/customers" icon={<Users size={20} />} label="Customers" isOpen={isOpen} />
            <NavItem to="/orders" icon={<Package size={20} />} label="Orders" isOpen={isOpen} />
          </div>
          
          {userRole === "superadmin" && (
            <div className="mb-4">
              <p className={cn("text-xs text-muted-foreground px-3 mb-2", !isOpen && "sr-only")}>Administration</p>
              <NavItem to="/admin/system" icon={<ShieldCheck size={20} />} label="System Settings" isOpen={isOpen} />
              <NavItem to="/admin/organization" icon={<Building size={20} />} label="Organization" isOpen={isOpen} />
              <NavItem to="/admin/users" icon={<User size={20} />} label="User Management" isOpen={isOpen} />
            </div>
          )}
          
          <div>
            <p className={cn("text-xs text-muted-foreground px-3 mb-2", !isOpen && "sr-only")}>Settings</p>
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />
          </div>
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
          "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors",
          isActive ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "",
          !isOpen && "justify-center px-0"
        )
      }
      title={!isOpen ? label : undefined}
    >
      <div className={cn(
        "min-w-5 flex items-center justify-center",
        isOpen ? "mr-2" : ""
      )}>
        {icon}
      </div>
      {isOpen && <span className="truncate">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
