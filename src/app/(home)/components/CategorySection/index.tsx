'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category, Listing } from '@/types';
import { useDirectory, CATEGORY_TAB_EVENT } from '@/components/DirectoryProvider';
import CategoryIcon from '@/components/CategoryIcon';
import styles from './styles.module.css';

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const { getCategoryListings, getCategoryTags } = useDirectory();
  const [activeSubTab, setActiveSubTab] = useState('全部');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // 子标签：全部 + 该分类下商家独有的标签
  const subTabs = useMemo(
    () => ['全部', ...getCategoryTags(category.id).map((tag) => tag.tag)],
    [getCategoryTags, category.id]
  );

  // 侧边栏 popover 切换页签
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ slug: string; tab: string }>).detail;
      if (detail && detail.slug === category.slug) {
        setActiveSubTab(detail.tab);
      }
    };
    window.addEventListener(CATEGORY_TAB_EVENT, handler);
    return () => window.removeEventListener(CATEGORY_TAB_EVENT, handler);
  }, [category.slug]);

  const getFilteredResources = (): Listing[] => {
    const inCategory = getCategoryListings(category.id);
    if (activeSubTab === '全部') {
      return inCategory;
    }
    return inCategory.filter((item) =>
      (item.tags || []).some((tag) => tag.tag === activeSubTab)
    );
  };

  const resources = getFilteredResources();

  return (
    <section id={category.slug} className="py-4 px-6 max-w-[1400px] mx-auto">
      {/* 分类标题 */}
      <div className="flex items-center gap-2 mb-4">
        <CategoryIcon slug={category.slug} size={20} background={false} />
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">{category.title}</h2>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>
        <Link href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
          更多 →
        </Link>
      </div>

      {/* Tab切换 - 标签样式 */}
      {subTabs.length > 1 && (
        <div className={styles.categoryTabs}>
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`${styles.tabButton} ${activeSubTab === tab ? styles.active : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* 资源网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {resources.slice(0, 12).map((resource) => (
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
                  src={resource.logo?.full_url || '/icons/favicon.png'}
                  alt={resource.title}
                  width={40}
                  height={40}
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate text-sm group-hover:text-blue-500 transition-colors">
                  {resource.title}
                </h3>
                {resource.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {resource.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="py-6 text-center text-xs text-gray-400 dark:text-gray-500">
          该分类下暂无内容
        </div>
      )}
    </section>
  );
}
