'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchListing, fetchListings, fetchReviews } from '@/lib/api';
import { Listing, Review } from '@/types';
import CategoryIcon from '@/components/CategoryIcon';

function ratingStars(rating: number): string {
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(Math.max(0, 5 - rounded));
}

export default function DetailContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [resource, setResource] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const listing = await fetchListing(params.id);
        if (cancelled) return;
        if (!listing) {
          setResource(null);
          return;
        }
        setResource(listing);

        const [reviewData, allListings] = await Promise.all([
          fetchReviews(listing.id).catch(() => [] as Review[]),
          fetchListings().catch(() => [] as Listing[]),
        ]);
        if (cancelled) return;

        setReviews(reviewData);
        setRelated(
          allListings
            .filter(
              (l) =>
                l.id !== listing.id &&
                listing.category &&
                l.category?.id === listing.category.id
            )
            .slice(0, 6)
        );
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : '加载失败');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-sm text-gray-400 dark:text-gray-500">加载中…</div>
      </div>
    );
  }

  if (!resource || error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {error ? '加载失败' : '资源未找到'}
          </h1>
          {error && <p className="text-sm text-gray-500 mb-4">{error}</p>}
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

  const category = resource.category;
  const infoItems: { label: string; value?: string }[] = [
    { label: '位置', value: resource.location?.name },
    { label: '价格区间', value: resource['price-range'] },
    { label: '营业时间', value: resource['opening-hours'] },
    { label: '地址', value: resource.address },
    { label: '电话', value: resource.phone },
    { label: '邮箱', value: resource.email },
  ].filter((item) => !!item.value);

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
                  src={resource.logo?.full_url || '/icons/favicon.png'}
                  alt={resource.title}
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
                      <CategoryIcon slug={category.slug} size={12} background={false} />
                      {category.title}
                    </span>
                  )}
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {resource.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag.id}
                          className="inline-flex items-center px-2.5 py-0.5 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs rounded-full"
                        >
                          #{tag.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{resource.title}</h1>
                {resource.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{resource.description}</p>
                )}
              </div>
            </div>

            {infoItems.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">详细信息</h3>
                <div className="flex flex-wrap gap-2">
                  {infoItems.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-200 text-sm rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <span className="text-gray-400 dark:text-gray-500 mr-1.5">{item.label}</span>
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex gap-3">
                {resource.website && (
                  <a
                    href={resource.website}
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

        {reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">用户评价</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.slice(0, 6).map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800 dark:text-white text-sm">
                      {review.name || '匿名用户'}
                    </span>
                    {typeof review.rating === 'number' && (
                      <span className="text-amber-400 text-sm">{ratingStars(review.rating)}</span>
                    )}
                  </div>
                  {review.review && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {review.review}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">相关资源</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <div
                  key={r.id}
                  onClick={() => router.push(`/detail/${r.id}`)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-700 flex-shrink-0">
                      <Image
                        src={r.logo?.full_url || '/icons/favicon.png'}
                        alt={r.title}
                        width={40}
                        height={40}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-white text-sm">{r.title}</h3>
                      {r.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{r.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
