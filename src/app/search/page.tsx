'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import { searchListings } from '@/lib/api';
import { Listing } from '@/types';

function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const query = (params.get('q') || '').trim();

  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      try {
        const data = await searchListings(query);
        if (!cancelled) setResults(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : '搜索失败');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 mb-6 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          返回首页
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🔍</span>
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">搜索结果</h2>
          {query && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              关键词“{query}”{!loading && !error ? `，共 ${results.length} 条` : ''}
            </span>
          )}
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>
        </div>

        {loading && (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">搜索中…</div>
        )}

        {!loading && error && (
          <div className="py-10 text-center text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && !query && (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
            请输入搜索关键词
          </div>
        )}

        {!loading && !error && query && results.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
            没有找到相关商家，换个关键词试试
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {results.slice(0, 50).map((resource) => (
              <Link
                key={resource.id}
                href={`/detail/${resource.id}`}
                className="group relative inline-block bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                onMouseEnter={() => setHoveredCardId(resource.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <i className="absolute top-2 right-2 w-0 h-0 border-t-[8px] border-t-gray-300 border-r-[8px] border-r-gray-300 border-b-[8px] border-b-transparent border-l-[8px] border-l-transparent dark:border-t-gray-600 dark:border-r-gray-600 rounded group-hover:border-t-blue-400 group-hover:border-r-blue-400 transition-colors"></i>
                <div className="flex items-center gap-3">
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
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-sm text-gray-400 dark:text-gray-500">加载中…</div>
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </ThemeProvider>
  );
}
