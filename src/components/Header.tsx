import React, { useState } from 'react';
import { Search, Bell, User, Upload, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
  onUploadClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick, onUploadClick }) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-netflix-red text-2xl md:text-3xl font-bold tracking-tight">
            NETCINE
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-netflix-light-gray transition-colors">Home</a>
            <a href="#" className="text-netflix-light-gray hover:text-white transition-colors">TV Shows</a>
            <a href="#" className="text-netflix-light-gray hover:text-white transition-colors">Movies</a>
            <a href="#" className="text-netflix-light-gray hover:text-white transition-colors">New & Popular</a>
            <a href="#" className="text-netflix-light-gray hover:text-white transition-colors">My List</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 border border-gray-600 rounded pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors w-64"
            />
          </div>

          {/* Upload button for authenticated users */}
          {user && (
            <button
              onClick={onUploadClick}
              className="flex items-center space-x-2 bg-netflix-red hover:bg-red-700 px-4 py-2 rounded transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden md:inline">Upload</span>
            </button>
          )}

          {/* Notifications */}
          {user && (
            <button className="text-white hover:text-netflix-light-gray transition-colors">
              <Bell className="w-6 h-6" />
            </button>
          )}

          {/* User menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-white hover:text-netflix-light-gray transition-colors"
              >
                <div className="w-8 h-8 bg-netflix-red rounded flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:inline">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-gray-600 rounded-lg py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-600">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-netflix-red hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};