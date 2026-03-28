import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Navbar */}
      <DashboardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}
      <main className={`pt-16 transition-all duration-300 ${
        isOpen ? 'ml-64' : 'ml-20'
      }`}>
        <div className="min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
