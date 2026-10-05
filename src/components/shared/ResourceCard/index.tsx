import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Resource } from '@/types';
import styles from './styles.module.css';

interface ResourceCardProps {
  resource: Resource;
  showSearch?: boolean;
}

export default function ResourceCard({ resource, showSearch = false }: ResourceCardProps) {
  const iconUrl = resource.icon;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 700);
    }
  };

  return (
    <Link
      href={`/detail/${resource.id}`}
      className="group bg-white border border-gray-200 rounded-md p-3 hover:shadow-lg hover:border-blue-500/30 transition-all duration-200"
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex items-start gap-3">
        {/* 图标 */}
        <div className={`relative w-10 h-10 rounded-md overflow-hidden bg-gray-50 flex-shrink-0 ${isAnimating ? 'animate-jumps' : ''}`}>
          <Image
            src={iconUrl}
            alt={resource.name}
            width={40}
            height={40}
            className="object-cover"
            unoptimized
          />
        </div>

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 truncate text-sm group-hover:text-blue-500 transition-colors">
            {resource.name}
          </h3>
          {resource.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {resource.description}
            </p>
          )}
          {/* 平台标签 */}
          {resource.platforms && resource.platforms.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {resource.platforms.map((platform) => (
                <span key={platform} className="inline-block px-1.5 py-0.5 bg-gray-50 text-gray-400 text-[10px] rounded">
                  {platform}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}