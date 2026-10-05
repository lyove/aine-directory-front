'use client';

import {
  Utensils,
  Coffee,
  BedDouble,
  ShoppingBag,
  Wrench,
  Sparkles,
  Car,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';

interface CategoryIconProps {
  slug: string;
  /** 图标像素尺寸，有背景时容器为 size × 1.75 的正方形 */
  size?: number;
  /** 是否显示渐变底色容器；false 时输出纯图标，颜色跟随 currentColor */
  background?: boolean;
  className?: string;
}

/** slug 归一化（去掉 -zh 后缀）后的图标映射 */
const ICONS: Record<string, LucideIcon> = {
  restaurants: Utensils,
  cafes: Coffee,
  hotels: BedDouble,
  shopping: ShoppingBag,
  services: Wrench,
  'health-beauty': Sparkles,
  automotive: Car,
};

/** 每个分类专属的渐变色 */
const GRADIENTS: Record<string, string> = {
  restaurants: 'from-orange-400 to-red-500',
  cafes: 'from-amber-400 to-orange-500',
  hotels: 'from-blue-500 to-indigo-600',
  shopping: 'from-pink-400 to-rose-600',
  services: 'from-slate-400 to-gray-600',
  'health-beauty': 'from-fuchsia-400 to-pink-600',
  automotive: 'from-cyan-400 to-blue-600',
};

/**
 * 一级分类图标：线性图标，可选渐变底色圆角容器。
 * - background=true：渐变底色块 + 白色图标（分类区块标题、详情页徽章）
 * - background=false：纯图标，颜色跟随 currentColor（侧边栏一级菜单）
 */
export default function CategoryIcon({
  slug,
  size = 18,
  background = true,
  className = '',
}: CategoryIconProps) {
  const normalized = slug.replace(/-zh$/, '');
  const Icon = ICONS[normalized] || FolderOpen;
  const gradient = GRADIENTS[normalized] || 'from-gray-400 to-gray-600';

  if (!background) {
    return <Icon size={size} strokeWidth={2} className={className} />;
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm flex-shrink-0 ${className}`}
      style={{ width: Math.round(size * 1.75), height: Math.round(size * 1.75) }}
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}
