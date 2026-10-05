'use client';

import { useState } from 'react';
import { Hash } from 'lucide-react';

interface FilterCategory {
  name: string;
  description: string;
  items: { name: string; href: string }[];
}

const filterCategories: FilterCategory[] = [
  {
    name: 'Next标签',
    description: '你的观看喜好/标签',
    items: [
      { name: 'Next推荐', href: '#' },
      { name: '弹幕多', href: '#' },
      { name: '4K画质', href: '#' },
      { name: '高清线路多', href: '#' },
      { name: '可缓存', href: '#' },
    ],
  },
  {
    name: '分类',
    description: '需要哪类的网址/APP',
    items: [
      { name: '影视', href: '#video' },
      { name: '动漫', href: '#anime' },
      { name: '漫画', href: '#anime' },
      { name: '音乐', href: '#music' },
      { name: '电子书', href: '#reading' },
      { name: '小说', href: '#reading' },
      { name: '听书', href: '#reading' },
      { name: '电视直播', href: '#entertainment' },
      { name: '游戏', href: '#game' },
      { name: '壁纸', href: '#entertainment' },
    ],
  },
  {
    name: '系统/设备',
    description: '在什么设备/系统中使用',
    items: [
      { name: 'Android', href: '#' },
      { name: 'iOS', href: '#' },
      { name: 'Windows', href: '#' },
      { name: 'macOS', href: '#' },
      { name: 'Linux', href: '#' },
      { name: '浏览器', href: '#' },
      { name: '电视', href: '#' },
      { name: '车机', href: '#' },
    ],
  },
  {
    name: 'APP接口',
    description: '视频/音乐接口',
    items: [
      { name: '影视仓', href: '#' },
      { name: 'TVbox', href: '#' },
      { name: 'ZYFun', href: '#' },
      { name: '洛雪音乐', href: '#' },
      { name: 'Musicfree', href: '#' },
      { name: 'IPTV', href: '#' },
    ],
  },
  {
    name: '下载方式',
    description: '常用的下载渠道',
    items: [
      { name: '直链下载', href: '#' },
      { name: '迅雷下载', href: '#' },
      { name: '夸克网盘', href: '#' },
      { name: '百度网盘', href: '#' },
      { name: '阿里云盘', href: '#' },
      { name: '迅雷网盘', href: '#' },
      { name: '115网盘', href: '#' },
      { name: '天翼网盘', href: '#' },
      { name: 'UC网盘', href: '#' },
    ],
  },
  {
    name: '视频下载',
    description: '视频分辨率/类型选择',
    items: [
      { name: '4K', href: '#' },
      { name: '1080P', href: '#' },
      { name: '蓝光', href: '#' },
      { name: '高清', href: '#' },
    ],
  },
];

export default function FilterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        {/* Hover渐变层 */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(236,72,153,0.15) 100%)',
          }}
        />
        
        {/* 图标 */}
        <div className="relative flex items-center justify-center w-5 h-5">
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-500 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        
        {/* 文字 */}
        <span className="relative text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          快速筛选网站
        </span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-20 left-[80px] w-[420px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 100px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 顶部渐变装饰条 */}
            <div
              className="h-2 rounded-t-2xl"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)',
              }}
            />
            
            <div 
              className="p-5 overflow-y-auto"
              style={{ 
                maxHeight: 'calc(100vh - 100px - 8px)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.2) transparent',
              }}
            >
              {filterCategories.map((category, catIdx) => (
                <div
                  key={catIdx}
                  className="mb-6 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {category.description}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIdx) => (
                      <a
                        key={itemIdx}
                        href={item.href}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 hover:scale-[1.03] hover:shadow-sm"
                      >
                        <Hash className="w-3 h-3 opacity-50" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}