
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Style Boutique</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your business performance and recent activity
        </p>
      </div>
      
      <DashboardStats />
      
      <RecentActivity />
    </div>
  );
};

export default Dashboard;
