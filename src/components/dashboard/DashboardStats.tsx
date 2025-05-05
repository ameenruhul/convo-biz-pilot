
import { 
  MessageSquare, 
  ShoppingCart, 
  Users, 
  ArrowUp, 
  ArrowDown, 
  Facebook, 
  Send 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Conversations"
        value="1,259"
        change={12}
        trend="up"
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <StatCard 
        title="New Customers"
        value="324"
        change={8}
        trend="up"
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard 
        title="Total Orders"
        value="842"
        change={5}
        trend="up"
        icon={<ShoppingCart className="h-4 w-4" />}
      />
      <StatCard 
        title="Response Rate"
        value="94%"
        change={2}
        trend="down"
        icon={<Send className="h-4 w-4" />}
      />

      <Card className="col-span-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <ChannelCard 
              title="Facebook Messenger"
              conversations={756}
              responseMins={3.2}
              conversionRate={8.4}
              icon={<Facebook className="h-5 w-5 text-blue-600" />}
            />
            <ChannelCard 
              title="WhatsApp Business"
              conversations={503}
              responseMins={4.5}
              conversionRate={9.2}
              icon={<MessageSquare className="h-5 w-5 text-green-600" />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, trend, icon }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs flex items-center mt-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
          {trend === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
          <span>{change}% from last month</span>
        </p>
      </CardContent>
    </Card>
  );
};

interface ChannelCardProps {
  title: string;
  conversations: number;
  responseMins: number;
  conversionRate: number;
  icon: React.ReactNode;
}

const ChannelCard = ({ title, conversations, responseMins, conversionRate, icon }: ChannelCardProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Chats</p>
          <p className="font-bold">{conversations}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Avg. Response</p>
          <p className="font-bold">{responseMins}m</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Conversion</p>
          <p className="font-bold">{conversionRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
