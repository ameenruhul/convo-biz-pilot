
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AppLayout = () => {
  const [user] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin" as "admin" | "superadmin",
    avatar: "https://i.pravatar.cc/150?u=admin",
  });

  // Toggle this value to switch between admin and superadmin for testing
  const userRole: "admin" | "superadmin" = "superadmin";

  return (
    <div className="min-h-screen flex">
      <Sidebar userRole={userRole} />
      
      <div className="flex-1 flex flex-col md:ml-16 md:ml-64">
        <Header 
          user={{
            ...user,
            role: userRole,
          }} 
          businessName="Style Boutique"
        />
        
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
