
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BookingDetails from './components/BookingDetails';
import { ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isMobileMenuOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          currentView={currentView} 
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' ? (
              <Dashboard />
            ) : (
              <BookingDetails />
            )}
          </div>
        </main>
        
        <footer className="py-4 px-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
          &copy; {new Date().getFullYear()} CoursePro Learning Management System. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default App;
