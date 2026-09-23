import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
  size = 'md',
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-3.5 py-2 text-sm',
  }[size];

  const iconSizes = {
    sm: 'text-[18px]',
    md: 'text-[20px]',
    lg: 'text-[22px]',
  }[size];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light mode (Alt+T)' : 'Switch to dark mode (Alt+T)'}
      className={`group relative flex items-center gap-2 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm active:scale-95 select-none ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-700/90 text-amber-300 border-slate-700 hover:border-slate-600 shadow-slate-900/40 backdrop-blur-md'
          : 'bg-white/90 hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200/90 hover:border-slate-300 shadow-slate-200/50 backdrop-blur-md'
      } ${sizeClasses} ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <span
          className={`material-symbols-outlined transition-transform duration-500 ${iconSizes} ${
            isDark ? 'rotate-[360deg] text-amber-300' : 'rotate-0 text-slate-700'
          }`}
        >
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </div>

      {showLabel && (
        <span className="font-semibold text-xs tracking-tight">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}

      {/* Subtle indicator ring on focus */}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
