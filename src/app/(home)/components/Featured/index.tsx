'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDirectory } from '@/components/DirectoryProvider';

export default function Featured() {
  const { featured } = useDirectory();
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  return (
    <section className="py-4 px-6 max-w-[1400px] mx-auto">
      {/* 标题行 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">❤️</span>
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">推荐</h2>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>

        {/* 顶部标签按钮 */}
        <Link
          href=""
          className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          target="_blank"
        >
          <span>💖</span>
          <span>必备：APP</span>
        </Link>
      </div>

      {/* 推荐卡片网格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {featured.map((item) => (
          <Link
            key={item.id}
            href={`/detail/${item.id}`}
            className="group relative inline-block bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onMouseEnter={() => setHoveredCardId(item.id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            {/* 右上角小三角图标 */}
            <i className="absolute top-2 right-2 w-0 h-0 border-t-[8px] border-t-gray-300 border-r-[8px] border-r-gray-300 border-b-[8px] border-b-transparent border-l-[8px] border-l-transparent dark:border-t-gray-600 dark:border-r-gray-600 rounded group-hover:border-t-blue-400 group-hover:border-r-blue-400 transition-colors"></i>

            <div className="flex items-center gap-3">
              {/* 图标 - hover跳动 */}
              <div className={`relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700 flex-shrink-0 ${hoveredCardId === item.id ? 'animate-jumps' : ''
                }`}>
                <Image
                  src={item.logo?.full_url || '/icons/favicon.png'}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm truncate group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{item.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
