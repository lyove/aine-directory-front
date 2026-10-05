'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Category, Listing, Tag } from '@/types';
import { fetchCategories, fetchListings } from '@/lib/api';

/** 侧边栏 popover / 分类页签切换事件 */
export const CATEGORY_TAB_EVENT = 'category-tab-change';

export function emitCategoryTab(slug: string, tab: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(CATEGORY_TAB_EVENT, { detail: { slug, tab } })
  );
}

interface DirectoryContextValue {
  categories: Category[];
  listings: Listing[];
  featured: Listing[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  /** 某个分类下的商家 */
  getCategoryListings: (categoryId: number) => Listing[];
  /** 某个分类下商家独有的标签（去重，按出现频次降序） */
  getCategoryTags: (categoryId: number) => Tag[];
}

const DirectoryContext = createContext<DirectoryContextValue | null>(null);

export function DirectoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [cats, list] = await Promise.all([
          fetchCategories(),
          fetchListings(),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setListings(list);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : '数据加载失败');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [version]);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  const featured = useMemo(
    () => listings.filter((l) => l.featured === true),
    [listings]
  );

  const value = useMemo<DirectoryContextValue>(
    () => ({
      categories,
      listings,
      featured,
      loading,
      error,
      refresh,
      getCategoryListings: (categoryId) =>
        listings.filter((l) => l.category?.id === categoryId),
      getCategoryTags: (categoryId) => {
        const tagMap = new Map<number, Tag>();
        const countMap = new Map<number, number>();
        listings
          .filter((l) => l.category?.id === categoryId)
          .forEach((l) => {
            (l.tags || []).forEach((tag) => {
              if (!tagMap.has(tag.id)) tagMap.set(tag.id, tag);
              countMap.set(tag.id, (countMap.get(tag.id) || 0) + 1);
            });
          });
        return Array.from(tagMap.values()).sort(
          (a, b) => (countMap.get(b.id) || 0) - (countMap.get(a.id) || 0)
        );
      },
    }),
    [categories, listings, featured, loading, error, refresh]
  );

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
}

export function useDirectory(): DirectoryContextValue {
  const ctx = useContext(DirectoryContext);
  if (!ctx) {
    throw new Error('useDirectory 必须在 DirectoryProvider 内使用');
  }
  return ctx;
}
