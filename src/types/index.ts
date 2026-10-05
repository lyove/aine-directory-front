/** 媒体资源（Business Directory 接口返回的 MediaResource 结构） */
export interface MediaItem {
  id: number;
  file_name: string;
  full_url: string;
  full_url_thumb?: string;
  caption?: string;
  size?: number;
  width?: number;
  height?: number;
}

/** 一级分类（Business Directory categories 集合） */
export interface Category {
  id: number;
  locale: string;
  title: string;
  slug: string;
  description?: string;
}

/** 地点（Business Directory locations 集合，作为分类下的子标签） */
export interface Location {
  id: number;
  locale: string;
  name: string;
  slug: string;
}

/** 标签（Business Directory tags 集合） */
export interface Tag {
  id: number;
  locale: string;
  tag: string;
}

/** 商家（Business Directory listings 集合） */
export interface Listing {
  id: number;
  locale: string;
  title: string;
  slug: string;
  website?: string;
  description?: string;
  category?: Category;
  tags?: Tag[];
  location?: Location;
  logo?: MediaItem | null;
  gallery?: MediaItem[];
  phone?: string;
  email?: string;
  address?: string;
  'opening-hours'?: string;
  'price-range'?: string;
  featured?: boolean;
}

/** 评价（Business Directory reviews 集合） */
export interface Review {
  id: number;
  locale: string;
  name?: string;
  rating?: number;
  review?: string;
  listing?: Listing;
}

export interface SearchSource {
  id: string;
  name: string;
  url: string;
}

/** 接口统一响应包裹 */
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}
