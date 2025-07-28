
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              סיכום
            </Link>
          </div>
          <nav className="flex items-center space-s-4">
            <NavLink to="/">ראשי</NavLink>
            <NavLink to="/categories">קטגוריות</NavLink>
            <NavLink to="/admin">ממשק ניהול</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
