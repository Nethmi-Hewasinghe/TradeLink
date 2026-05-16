'use client';

import { useState, useEffect } from 'react';
import { logout, getCurrentUser, isAuthenticated } from '../services/api';

export default function Navigation() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.href = '/';
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">
                Service Request Board
              </h1>
            </a>
            <div className="flex items-center gap-4">
              {/* Loading state */}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              Service Request Board
            </h1>
          </a>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  Welcome, {user.name}
                </span>
                <a
                  href="/new-job"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  Post New Job
                </a>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
