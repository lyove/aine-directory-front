import { ApiResponse, Category, Listing, Location, Review, Tag } from '@/types';

/**
 * Business Directory 项目接口基地址。
 * - 默认指向线上部署：https://aine.lyove.com（laravel-aine-thematic 部署后）
 * - 可通过环境变量 NEXT_PUBLIC_API_BASE 覆盖，例如本地联调：
 *   NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api/project/directory npm run dev
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://aine.lyove.com/api/project/directory';

/**
 * 内容语言。
 * - Business Directory 项目默认语言为 en，同时内置完整中文数据（locale=zh）
 * - 本站为中文站，默认取 zh；可通过 NEXT_PUBLIC_API_LOCALE 覆盖
 */
export const API_LOCALE = process.env.NEXT_PUBLIC_API_LOCALE || 'zh';

const TIMEOUT = 15000;

async function http<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}${path.includes('?') ? '&' : '?'}locale=${API_LOCALE}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`接口请求失败（HTTP ${res.status}）`);
    }
    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success) {
      throw new Error(json.message || '接口返回异常');
    }
    return json.data;
  } finally {
    clearTimeout(timer);
  }
}

/** 一级分类列表 */
export function fetchCategories(): Promise<Category[]> {
  return http<Category[]>('/categories');
}

/** 地点列表（用于分类下的子标签筛选） */
export function fetchLocations(): Promise<Location[]> {
  return http<Location[]>('/locations');
}

/** 标签列表 */
export function fetchTags(): Promise<Tag[]> {
  return http<Tag[]>('/tags?limit=100');
}

/** 全部商家列表（limit 最大 100，当前演示数据 22 条，一次拉全后前端分组） */
export function fetchListings(): Promise<Listing[]> {
  return http<Listing[]>('/listings?limit=100&timestamps=1');
}

/** 单个商家详情（按 ID） */
export async function fetchListing(id: number | string): Promise<Listing | null> {
  try {
    return await http<Listing>(`/listings/${id}?timestamps=1`);
  } catch (e) {
    if (e instanceof Error && e.message.includes('HTTP 404')) {
      return null;
    }
    throw e;
  }
}

/** 某商家下的评价 */
export function fetchReviews(listingId: number | string): Promise<Review[]> {
  return http<Review[]>(`/reviews?filters%5Blisting%5D=${listingId}&limit=50`);
}

/** 商家搜索 */
export function searchListings(query: string): Promise<Listing[]> {
  return http<Listing[]>(
    `/listings/search?query=${encodeURIComponent(query.trim())}&limit=50`
  );
}
