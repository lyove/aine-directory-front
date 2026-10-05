'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Popup, { PopupProvider } from '@/components/ui/Popup';
import { useDirectory, emitCategoryTab } from '@/components/DirectoryProvider';
import CategoryIcon from '@/components/CategoryIcon';
import styles from './styles.module.css';

export default function Sidebar() {
  const { categories, getCategoryTags, loading } = useDirectory();
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (activeId === '' && categories.length > 0) {
      setActiveId(categories[0].slug);
    }
  }, [categories, activeId]);

  return (
    <PopupProvider>
      <aside className="fixed left-0 top-0 h-full w-[72px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 z-40 flex flex-col items-center py-3 hidden md:flex">
        {/* 顶部固定部分 */}
        <div className="flex-none flex flex-col items-center">
          <Link href="/" className="mb-4 flex flex-col items-center">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl">
              👊
            </div>
            <span className="text-[13px] font-bold text-gray-700">AineNext</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto flex flex-col w-full gap-2 py-1">
          {loading && categories.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[56px] h-[54px] rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          ) : (
            categories.map((category) => {
              const slug = category.slug;
              const href = `#${slug}`;
              const trigger = (
                <Link
                  href={href}
                  onClick={() => setActiveId(slug)}
                  className={`mx-auto w-[56px] h-[54px] flex flex-col items-center justify-center rounded-lg transition-colors ${
                    activeId === slug
                      ? 'bg-gray-100 dark:bg-gray-700 text-blue-500'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  <CategoryIcon slug={slug} size={20} background={false} />
                  <span className="text-[10px] mt-1">{category.title}</span>
                </Link>
              );

              const content = (
                <>
                  {getCategoryTags(category.id).map((tag) => (
                    <Link
                      key={tag.id}
                      href={href}
                      onClick={() => {
                        setActiveId(slug);
                        emitCategoryTab(slug, tag.tag);
                      }}
                      className="block mx-2 my-0.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {tag.tag}
                    </Link>
                  ))}
                </>
              );

              return (
                <Fragment key={category.id}>
                  <Popup trigger={trigger} content={content} menuId={slug} />
                </Fragment>
              );
            })
          )}
        </nav>

        {/* 底部固定部分 */}
        <div className="flex-none flex flex-col items-center mt-4">
          <button className="w-11 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800">
            ⚙️
          </button>
        </div>
      </aside>
    </PopupProvider>
  );
}
