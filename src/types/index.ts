export interface Resource {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  platforms: string[];
  searchUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subTabs: string[];
  resources: Resource[];
  resourceMap?: Record<string, Resource[]>;
}

export interface SearchSource {
  id: string;
  name: string;
  url: string;
}