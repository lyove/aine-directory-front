'use client';

import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Popup, { PopupProvider } from '@/components/ui/Popup';
import styles from './styles.module.css';

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  popoverItems?: { name: string; href?: string }[];
}

const navItems: NavItem[] = [
  {
    id: 'video',
    name: '视频',
    href: '#video',
    icon: '📺',
    popoverItems: [
      { name: '在线看' },
      { name: '下载' },
      { name: '网盘' },
      { name: 'Android' },
      { name: 'iOS' },
      { name: 'TV' },
      { name: 'PC' },
      { name: '字幕' },
      { name: '神器' },
    ]
  },
  {
    id: 'anime',
    name: '二次元',
    href: '#anime',
    icon: '🎭',
    popoverItems: [
      { name: '动漫' },
      { name: '漫画' },
      { name: '下载' },
      { name: '神器' },
    ]
  },
  {
    id: 'music',
    name: '音乐',
    href: '#music',
    icon: '🎵',
    popoverItems: [
      { name: '听歌' },
      { name: '无损音乐' },
      { name: '电台' },
      { name: '曲艺' },
      { name: 'K歌' },
    ]
  },
  {
    id: 'reading',
    name: '阅读',
    href: '#reading',
    icon: '📖',
    popoverItems: [
      { name: '电子书' },
      { name: '小说' },
      { name: '听书' },
      { name: '报刊杂志' },
    ]
  },
  {
    id: 'game',
    name: '游戏',
    href: '#game',
    icon: '🎮',
    popoverItems: [
      { name: '游戏下载' },
      { name: '在线小游戏' },
    ]
  },
  {
    id: 'entertainment',
    name: '娱乐',
    href: '#entertainment',
    icon: '🎬',
    popoverItems: [
      { name: '电视直播' },
      { name: '壁纸' },
      { name: '育儿学习' },
    ]
  },
  {
    id: 'toolbox',
    name: '工具箱',
    href: '#toolbox',
    icon: '🔧',
    popoverItems: [
      { name: 'AI助手' },
      { name: '视频' },
      { name: '音频' },
      { name: '图片' },
      { name: '素材&资源' },
      { name: '办公相关' },
      { name: '格式转换' },
      { name: '文件传输' },
      { name: '实用工具' },
    ]
  },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState('video');

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

        <nav className="flex-1 overflow-y-auto flex flex-col w-full">
          {navItems.map((item) => {
            const trigger = (
              <Link
                href={item.href}
                onClick={() => setActiveId(item.id)}
                className={`mx-auto w-[56px] h-[52px] flex flex-col items-center justify-center rounded-lg transition-colors ${
                  activeId === item.id
                    ? 'bg-gray-100 dark:bg-gray-700 text-blue-500'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <span className="text-[20px]">{item.icon}</span>
                <span className="text-[10px] mt-0.5">{item.name}</span>
              </Link>
            );

            const content = (
              <>
                {item.popoverItems?.map((popItem, idx) => (
                  <Link
                    key={idx}
                    href={popItem.href || item.href}
                    className={`block mx-2 my-0.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2a2a2a] hover:text-blue-500 dark:hover:text-blue-400 transition-colors ${
                      popItem.name === '在线看' ? 'bg-gray-100 dark:bg-[#2a2a2a] font-medium text-blue-500 dark:text-blue-400' : ''
                    }`}
                  >
                    {popItem.name}
                  </Link>
                ))}
              </>
            );

            return (
              <Fragment key={item.id}>
                {item.popoverItems && item.popoverItems.length > 0 ? (
                  <Popup trigger={trigger} content={content} menuId={item.id} />
                ) : (
                  trigger
                )}
              </Fragment>
            );
          })}
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