import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import { Bell, User, LogOut, Menu, Sun, Moon, Command } from 'lucide-react';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          {/* Search Bar */}
          <SearchBar />
        </div>

        <div className="flex items-center space-x-4">
          {/* Command Palette Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Trigger command palette
              const event = new KeyboardEvent('keydown', {
                key: 'k',
                ctrlKey: true,
                bubbles: true
              });
              document.dispatchEvent(event);
            }}
            className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
            title="Ouvrir la palette de commandes (Ctrl+K)"
          >
            <Command className="w-4 h-4" />
            <span className="hidden lg:inline">Recherche rapide</span>
            <div className="hidden lg:flex items-center space-x-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
              <span>⌘</span>
              <span>K</span>
            </div>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </motion.button>

          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                language === 'fr' 
                  ? 'bg-white dark:bg-gray-700 text-teal-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              FR
            </button>
           
          </div>

          {/* Notifications */}
        

          {/* Company Name */}
          {user?.company?.name && (
            <div className="text-lg font-bold text-gray-900 dark:text-white uppercase">
              {user.company.name}
              {!user.isAdmin && user.email !== 'admin@facture.ma' && (
                (() => {
                  // Vérifier si l'abonnement est expiré
                  const isExpired = user?.company?.subscription === 'pro' && 
                    user?.company?.expiryDate && 
                    new Date(user.company.expiryDate) < new Date();
                  
                  return (
                    <motion.span 
                      animate={isExpired ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      isExpired 
                        ? 'bg-red-100 text-red-800 animate-pulse' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {isExpired ? '🔒 Bloqué' : 'Utilisateur'}
                    </motion.span>
                  );
                })()
              )}
              {user.email === 'admin@facture.ma' && (
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Admin Plateforme
                </span>
              )}
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {user?.company.logo ? (
                  <img 
                    src={user.company.logo} 
                    alt="Logo" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.button>
              
              {/* Dropdown Menu */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              >
                <div className="py-2">
                  {user && (
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email === 'admin@facture.ma' ? 'Admin Plateforme' : 
                         user.isAdmin ? 'Administrateur' : 'Utilisateur'}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}