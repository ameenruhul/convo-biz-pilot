
import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = () => {
  const [user] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin" as "admin" | "superadmin",
    avatar: "https://i.pravatar.cc/150?u=admin",
  });

  // Set to superadmin for testing superadmin-specific routes
  const userRole: "admin" | "superadmin" = "superadmin";
  const location = useLocation();

  // Check for protected superadmin routes
  const isSuperAdminRoute = location.pathname.startsWith('/admin/');
  if (isSuperAdminRoute && userRole !== 'superadmin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col md:ml-16">
        <Header 
          user={{
            ...user,
            role: userRole,
          }} 
          businessName="Style Boutique"
        />
        
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
