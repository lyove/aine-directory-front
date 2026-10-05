'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Banner from './components/Banner';
import SearchSection from './components/SearchSection';
import Featured from './components/Featured';
import CategorySection from './components/CategorySection';
import Footer from '@/components/layout/Footer';
import DownloadModal from '@/components/ui/DownloadModal';
import { categories } from '@/data/resources';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        
        <main className="md:ml-[72px] pt-14 md:pt-0">
          <Banner />
          <SearchSection />
          <Featured />
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
          <Footer />
        </main>
        
        <DownloadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </ThemeProvider>
  );
}