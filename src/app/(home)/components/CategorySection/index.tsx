'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category, Resource } from '@/types';
import styles from './styles.module.css';

interface CategorySectionProps {
  category: Category;
}

const platformIcons: Record<string, string> = {
  'iOS': '🍎',
  '安卓': '🤖',
  'Android': '🤖',
  'Windows': '🪟',
  'macOS': '🍎',
  'Linux': '🐧',
  'TV': '📺',
  'PC': '🖥️',
  'Web': '🌐',
};

export default function CategorySection({ category }: CategorySectionProps) {
  const [activeSubTab, setActiveSubTab] = useState(category.subTabs[0]);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const getFilteredResources = (): Resource[] => {
    if (!category.resourceMap || !category.resourceMap[activeSubTab]) {
      return category.resources;
    }
    return category.resourceMap[activeSubTab] || category.resources;
  };

  return (
    <section id={category.id} className="py-4 px-6 max-w-[1400px] mx-auto">
      {/* 分类标题 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{category.icon}</span>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">{category.name}</h2>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>
        <Link href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
          更多 →
        </Link>
      </div>

      {/* Tab切换 - 标签样式 */}
      <div className={styles.categoryTabs}>
        {category.subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`${styles.tabButton} ${activeSubTab === tab ? styles.active : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 资源网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {getFilteredResources().slice(0, 12).map((resource) => (
          <Link
            key={resource.id}
            href={`/detail/${resource.id}`}
            className="group relative inline-block bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onMouseEnter={() => setHoveredCardId(resource.id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            {/* 右上角小三角图标 */}
            <i className="absolute top-2 right-2 w-0 h-0 border-t-[8px] border-t-gray-300 border-r-[8px] border-r-gray-300 border-b-[8px] border-b-transparent border-l-[8px] border-l-transparent dark:border-t-gray-600 dark:border-r-gray-600 rounded group-hover:border-t-blue-400 group-hover:border-r-blue-400 transition-colors"></i>

            <div className="flex items-center gap-3">
              {/* 图标 - hover时跳动效果 */}
              <div className={`relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 flex-shrink-0 ${hoveredCardId === resource.id ? 'animate-jumps' : ''
                }`}>
                <Image
                  src={resource.icon}
                  alt={resource.name}
                  width={40}
                  height={40}
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate text-sm group-hover:text-blue-500 transition-colors">
                  {resource.name}
                </h3>
                {resource.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {resource.description}
                  </p>
                )}
              </div>

              {/* 小箭头 - 右下角 */}
              {/* <span className="w-4 h-4">
                <svg className="text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span> */}

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}