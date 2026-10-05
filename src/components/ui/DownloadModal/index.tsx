'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Smartphone, Download, MessageCircle } from 'lucide-react';
import styles from './styles.module.css';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [activeTab, setActiveTab] = useState('android');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg p-6 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Smartphone className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">AineNext</h2>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">免费</span>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">安全</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">高质</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">免费、安全、高质，一个都不妥协！</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'android'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🤖 Android
          </button>
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'ios'
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🍎 iOS
          </button>
          <button
            onClick={() => setActiveTab('pc')}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'pc'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🪟 PC
          </button>
        </div>

        {activeTab === 'android' && (
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
              <Download className="w-5 h-5" />
              安卓版 安装即用
            </button>
            <p className="text-center text-sm text-gray-500">点击下载后，允许安装未知来源应用即可</p>
          </div>
        )}

        {activeTab === 'ios' && (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-xl">
              <p className="text-sm text-yellow-800 mb-2">方法一：变身安装</p>
              <p className="text-xs text-yellow-600">打开APP后，点击 允许粘贴 → 关闭APP并重新打开即可变身</p>
              <button className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors">
                <Download className="w-5 h-5" />
                下载
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800 mb-2">方法二：激活码</p>
              <p className="text-xs text-blue-600">右上角 意见反馈 → 粘贴(Paste)或输入 BGZ0666 → 允许使用网络，关闭APP并重新打开</p>
              <button className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors">
                <Download className="w-5 h-5" />
                下载
              </button>
            </div>
            <Link href="#" className="block text-center text-sm text-blue-600 hover:underline">
              如遇iOS变身失败，请点此反馈
            </Link>
          </div>
        )}

        {activeTab === 'pc' && (
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              Windows / macOS 客户端
            </button>
            <p className="text-center text-sm text-gray-500">支持 Windows 10+ 和 macOS 10.15+</p>
          </div>
        )}

        <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
          <MessageCircle className="w-5 h-5" />
          添加微信群获取最新版本
        </button>
      </div>
    </div>
  );
}