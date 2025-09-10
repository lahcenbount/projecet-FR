import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, Settings, Bell, Menu, X } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RM</span>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-semibold text-gray-900">
                Rental Manager
              </h1>
            </div>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Links */}
            <nav className="flex space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/car-rental')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Location
              </button>
            </nav>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* Menu utilisateur */}
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.prenom} {currentUser?.nom}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
              </button>

              {/* Menu déroulant */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <User className="w-4 h-4 mr-3" />
                    Mon profil
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <Settings className="w-4 h-4 mr-3" />
                    Paramètres
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile étendu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {currentUser?.prenom} {currentUser?.nom}
                  </p>
                  <p className="text-sm text-gray-500">{currentUser?.email}</p>
                </div>
              </div>
              
              <button className="flex items-center px-3 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left rounded-md">
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </button>
              
              <button className="flex items-center px-3 py-2 text-base text-gray-700 hover:bg-gray-100 w-full text-left rounded-md">
                <Settings className="w-5 h-5 mr-3" />
                Paramètres
              </button>
              
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center px-3 py-2 text-base text-red-700 hover:bg-red-50 w-full text-left rounded-md"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}