
import React, { useState } from 'react';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onOpenMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onOpenMobileMenu }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const viewTitles: Record<ViewType, string> = {
    dashboard: 'Dashboard Overview',
    bookings: 'Booking Management',
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={onOpenMobileMenu}
          className="p-2 mr-4 text-slate-600 rounded-lg lg:hidden hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 lg:text-xl">
          {viewTitles[currentView]}
        </h1>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
              <User size={18} />
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-700">Admin User</span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                  <p className="text-sm font-semibold text-slate-900">Admin User</p>
                  <p className="text-xs text-slate-500">superadmin@coursepro.com</p>
                </div>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    alert('Logged out successfully');
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
