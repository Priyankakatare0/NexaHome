import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, isLoading } = useAuth();

  // If still loading, return null
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
