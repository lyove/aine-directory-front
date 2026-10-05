'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

const navItems = [
  { name: '影视', href: '#video', icon: '🎬' },
  { name: '动漫', href: '#anime', icon: '🎌' },
  { name: '漫画', href: '#anime', icon: '📚' },
  { name: '音乐', href: '#music', icon: '🎵' },
  { name: '电子书', href: '#reading', icon: '📖' },
  { name: '小说', href: '#reading', icon: '📝' },
  { name: '听书', href: '#reading', icon: '🎧' },
  { name: '电视直播', href: '#entertainment', icon: '📺' },
  { name: '游戏', href: '#game', icon: '🎮' },
  { name: '壁纸', href: '#entertainment', icon: '🖼' },
];

const platformItems = [
  { name: 'Android', icon: '🤖' },
  { name: 'iOS', icon: '🍎' },
  { name: 'Windows', icon: '🪟' },
  { name: 'macOS', icon: '💻' },
  { name: 'Linux', icon: '🐧' },
  { name: '浏览器', icon: '🌐' },
  { name: '电视', icon: '📺' },
  { name: '车机', icon: '🚗' },
];

const toolItems = [
  { name: '影视仓', icon: '📦' },
  { name: 'TVbox', icon: '📺' },
  { name: 'ZYFun', icon: '🎬' },
  { name: '洛雪音乐', icon: '🎵' },
  { name: 'Musicfree', icon: '🎧' },
  { name: 'IPTV', icon: '📡' },
];

const downloadItems = [
  { name: '直链下载', icon: '🔗' },
  { name: '迅雷下载', icon: '⚡' },
  { name: '夸克网盘', icon: '☁️' },
  { name: '百度网盘', icon: '📁' },
  { name: '阿里云盘', icon: '🅰️' },
  { name: '迅雷网盘', icon: '⚡' },
  { name: '115网盘', icon: '🔢' },
  { name: '天翼网盘', icon: '☁️' },
  { name: 'UC网盘', icon: '🇺' },
];

const qualityItems = [
  { name: '4K', icon: '4️⃣' },
  { name: '1080', icon: '1️⃣' },
  { name: '720', icon: '7️⃣' },
  { name: 'MV', icon: '📹' },
  { name: 'Hi-Res', icon: '🔊' },
  { name: '无损', icon: '💎' },
  { name: '标准音质MP3', icon: '🎵' },
  { name: '批量下歌', icon: '📥' },
  { name: '歌词下载', icon: '📜' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:bg-gray-800">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* 主导航栏 */}
        <div className="flex items-center justify-between h-[50px]">
          <div className="flex items-center gap-3">
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 font-bold text-lg hover:opacity-80 transition-opacity">
              <span className="text-xl">👊</span>
            </Link>

            {/* 九宫格按钮 */}
            <button className="hidden md:flex items-center justify-center w-8 h-8 hover:bg-white/10 rounded transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="6" height="6" rx="1" />
                <rect x="11" y="3" width="6" height="6" rx="1" />
                <rect x="3" y="11" width="6" height="6" rx="1" />
                <rect x="11" y="11" width="6" height="6" rx="1" />
              </svg>
            </button>
          </div>

          {/* 导航项 */}
          <nav className="hidden md:flex items-center flex-wrap gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* 右侧图标 */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-slide-down">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center gap-1 p-2 text-sm hover:bg-white/10 rounded transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="mb-4">
              <span className="text-[#ffd700] text-sm px-2 font-medium">平台</span>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {platformItems.map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-white/10 rounded-full transition-colors justify-center"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-[#ffd700] text-sm px-2 font-medium">工具</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {toolItems.map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-white/10 rounded-full transition-colors justify-center"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-[#ffd700] text-sm px-2 font-medium">下载方式</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {downloadItems.map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-white/10 rounded-full transition-colors justify-center"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[#ffd700] text-sm px-2 font-medium">画质</span>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {qualityItems.map((item) => (
                  <Link
                    key={item.name}
                    href="#"
                    className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-white/10 rounded-full transition-colors justify-center"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}