'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { categories, featuredRecommendations } from '@/data/resources';
import { Resource, Category } from '@/types';

function getResourceById(id: string): { resource: Resource; category?: Category } | null {
  for (const category of categories) {
    const found = category.resources.find(r => r.id === id);
    if (found) {
      return { resource: found, category };
    }
  }
  for (const resource of featuredRecommendations) {
    if (resource.id === id) {
      return { resource: { ...resource, description: resource.description || '' } };
    }
  }
  return null;
}

export default function DetailContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const result = getResourceById(params.id);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">资源未找到</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const { resource, category } = result;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 mb-6 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          返回首页
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 flex-shrink-0">
                <Image
                  src={resource.icon}
                  alt={resource.name}
                  width={80}
                  height={80}
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {category && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full">
                      <span>{category.icon}</span>
                      {category.name}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{resource.name}</h1>
                {resource.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{resource.description}</p>
                )}
              </div>
            </div>

            {resource.platforms && resource.platforms.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">支持平台</h3>
                <div className="flex flex-wrap gap-2">
                  {resource.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200 text-sm rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-3">
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    访问网站
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">相关资源</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category?.resources.filter(r => r.id !== params.id).slice(0, 6).map((r) => (
              <div
                key={r.id}
                onClick={() => router.push(`/detail/${r.id}`)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-700 flex-shrink-0">
                    <Image
                      src={r.icon}
                      alt={r.name}
                      width={40}
                      height={40}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white text-sm">{r.name}</h3>
                    {r.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{r.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}