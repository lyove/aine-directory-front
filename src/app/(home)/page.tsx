'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/layout/Sidebar';
import Banner from './components/Banner';
import SearchSection from './components/SearchSection';
import Featured from './components/Featured';
import CategorySection from './components/CategorySection';
import Footer from '@/components/layout/Footer';
import DownloadModal from '@/components/ui/DownloadModal';
import { DirectoryProvider, useDirectory } from '@/components/DirectoryProvider';

function HomeContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const { categories, loading, error, refresh } = useDirectory();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <main className="md:ml-[72px] pt-14 md:pt-0">
        <Banner />

        {/* 数据加载/异常提示 */}
        {error && (
          <div className="px-6">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 py-3 px-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
              <span>数据加载失败：{error}</span>
              <button
                onClick={refresh}
                className="flex-shrink-0 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                重试
              </button>
            </div>
          </div>
        )}

        <SearchSection />

        {loading && categories.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
            加载中…
          </div>
        ) : (
          <div id="categories-root">
            <Featured />
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        )}

        <Footer />
      </main>

      <DownloadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <DirectoryProvider>
        <HomeContent />
      </DirectoryProvider>
    </ThemeProvider>
  );
}
