'use client';

import { useState } from 'react';
import styles from './styles.module.css';

export default function SearchSection() {
  const [activeTab, setActiveTab] = useState('商家搜索');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('相关');
  const [isFocused, setIsFocused] = useState(false);

  const sources = ['相关', '推荐', '最新'];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.open(`/search?q=${encodeURIComponent(searchQuery.trim())}`, '_blank');
    }
  };

  return (
    <section className="pt-8 pb-4 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Tab切换 - 下划线动画 */}
        <div className="flex justify-center gap-8 mb-2">
          {['商家搜索', '商家分类'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'text-blue-500'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              {tab}
              {/* 下划线 - 从中心展开 */}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full animate-scale-up"></div>
              )}
            </button>
          ))}
        </div>

        {/* 搜索框 - focus时发光效果 */}
        <div className="relative mt-3">
          <div className={`flex items-center bg-white dark:bg-gray-800 border-2 rounded-full px-4 py-2.5 transition-all duration-300 ${
            isFocused
              ? 'border-blue-500 shadow-lg shadow-blue-500/20'
              : 'border-gray-200 dark:border-gray-600'
          }`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="输入你想查询的商家名称、描述或标签"
              className="flex-1 px-2 py-1 text-sm focus:outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* 搜索按钮 - hover缩放和发光 */}
            <button
              onClick={handleSearch}
              className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 flex-shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/40"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 快捷来源选择 - hover动画 */}
        <div className="flex justify-center gap-6 mt-3">
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`text-xs transition-all duration-200 ${
                selectedSource === source
                  ? 'text-blue-500 font-medium scale-105'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:scale-105'
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
