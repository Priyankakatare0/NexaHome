import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-slate-950 via-slate-950 to-black border-b border-slate-800 backdrop-blur-sm h-16">
      <div className="flex items-center justify-between h-full">

        {/* LEFT: NexaHome Logo */}
        <div className="flex items-center h-full border-r border-slate-800">
          <div className={`flex items-center justify-center gap-3 transition-all duration-300 h-full flex-shrink-0 ${
            isOpen ? 'w-64 px-6' : 'w-20 px-3'
          }`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500 text-black font-bold text-lg flex-shrink-0">
              N
            </div>
            {isOpen && (
              <span className="text-xl font-bold text-white whitespace-nowrap">NexaHome</span>
            )}
          </div>
        </div>

        {/* CENTER: Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-lg h-10 w-10 text-cyan-500 hover:bg-slate-800 transition-colors flex-shrink-0 mx-4"
        >
          <Menu size={24} />
        </button>

        {/* CENTER: Spacer */}
        <div className="flex-1"></div>

        {/* RIGHT: User */}
        <div className="flex items-center gap-4 px-6 h-full">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                U
              </div>
              <span className="text-base text-lg text-slate-200 hidden sm:inline font-medium">
                User
              </span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
