'use client';

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import FilterPopup from '@/app/(home)/components/FilterPopup';
import styles from './styles.module.css';

export default function Banner() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="pt-8 pb-4 px-6">
      <div className="flex justify-between items-center mb-4">
        <FilterPopup />
        <div className="flex gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 hover:scale-105">
            <span>👁</span>
            <span>关注</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:scale-110 transition-all duration-200"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </section>
  );
}