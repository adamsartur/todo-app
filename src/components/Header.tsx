import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiArrowLeft, FiArrowRight, FiMoon, FiSun, FiEyeOff } from 'react-icons/fi';

interface HeaderProps {
  title: string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showCompleted: boolean;
  toggleShowCompleted: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  theme, 
  toggleTheme, 
  showCompleted, 
  toggleShowCompleted,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  return (
    <header className="everest-app__header">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="everest-app__title mb-4 sm:mb-0">{title}</h1>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onUndo}
            disabled={!canUndo}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              canUndo ? 'bg-tertiary hover:bg-tertiary/90' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
            whileHover={canUndo ? { scale: 1.05 } : {}}
            whileTap={canUndo ? { scale: 0.95 } : {}}
            title="Undo (Ctrl+Z)"
          >
            <FiArrowLeft className="h-5 w-5 text-white" />
          </motion.button>
          
          <motion.button
            onClick={toggleShowCompleted}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${showCompleted ? 'Hide' : 'Show'} completed todos`}
          >
          {showCompleted ? (
                <FiEye 
                  className={`h-5 w-5 text-secondary dark:text-gray-300`}
                />
            ) : (
                <FiEyeOff 
                  className={`h-5 w-5 text-gray-400 dark:text-gray-300`}
                />
          )}
          </motion.button>
          
          <motion.button
            onClick={onRedo}
            disabled={!canRedo}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              canRedo ? 'bg-tertiary hover:bg-tertiary/90' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
            whileHover={canRedo ? { scale: 1.05 } : {}}
            whileTap={canRedo ? { scale: 0.95 } : {}}
            title="Redo (Ctrl+Shift+Z)"
          >
            <FiArrowRight className="h-5 w-5 text-white" />
          </motion.button>
          
          <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <FiMoon className="h-5 w-5" />
            ) : (
              <FiSun className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
