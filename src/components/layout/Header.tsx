
import { useState } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    role: "admin" | "superadmin";
    avatar?: string;
  };
  businessName?: string;
}

const Header = ({ user, businessName = "ConvoBiz Pilot" }: HeaderProps) => {
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-30 h-16 px-4 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between">
      <div className="md:hidden">
        <h2 className="font-bold text-lg text-brand-600">{businessName}</h2>
      </div>

      <div className="hidden md:block">
        <h2 className="text-lg font-medium">{businessName}</h2>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <NotificationItem
                title="New message from John Doe"
                description="Hey, when will my order be ready?"
                time="5 minutes ago"
              />
              <NotificationItem
                title="New order received"
                description="Order #1234 has been placed"
                time="10 minutes ago"
              />
              <NotificationItem
                title="FAQ update required"
                description="Please review and update the shipping FAQ"
                time="1 hour ago"
              />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-brand-100 text-brand-700">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {user.role === "superadmin" ? "Super Admin" : "Admin"}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
}

const NotificationItem = ({ title, description, time }: NotificationItemProps) => {
  return (
    <div className="px-4 py-3 hover:bg-muted/50 cursor-pointer">
      <div className="flex justify-between">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default Header;
