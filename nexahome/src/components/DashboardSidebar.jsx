import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Laptop2,
  Clock,
  Key,
  LogOut
} from 'lucide-react';

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Laptop2,
      label: 'Devices',
      path: '/devices'
    },
    {
      icon: Clock,
      label: 'Schedules',
      path: '/schedules'
    },
    {
      icon: Key,
      label: 'Credentials',
      path: '/credentials'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-gradient-to-b from-slate-950 to-black border-r border-slate-800 transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Menu */}
        <nav className={`transition-all duration-300 ${
          isOpen ? 'p-4 space-y-2' : 'p-3 space-y-4'
        }`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                }}
                title={item.label}
                className={`flex items-center gap-3 rounded-lg transition-all duration-200 ${
                  isOpen ? 'w-full px-4 py-3' : 'w-12 h-12 justify-center'
                } ${
                  active
                    ? isOpen
                      ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-500'
                      : 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={22} className="flex-shrink-0" />
                {isOpen && <span className="font-medium text-base">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer - Logout */}
        <div className={`absolute bottom-0 left-0 right-0 border-t border-slate-800 transition-all duration-300 ${
          isOpen ? 'p-4' : 'p-3'
        }`}>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Logout"
            className={`flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 ${
              isOpen ? 'w-full px-4 py-3' : 'w-12 h-12 justify-center'
            }`}
          >
            <LogOut size={22} className="flex-shrink-0" />
            {isOpen && <span className="font-medium text-base">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
