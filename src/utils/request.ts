interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retry?: number;
  retryDelay?: number;
}

interface Interceptor<T> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: unknown) => unknown;
}

interface Response<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestInit & { url: string };
}

class HttpFetch {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private retry: number;
  private retryDelay: number;
  private requestInterceptors: Interceptor<RequestInit & { url: string }>[] = [];
  private responseInterceptors: Interceptor<Response<unknown>>[] = [];
  private abortControllers: Map<string, AbortController> = new Map();

  constructor(config: RequestConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 10000;
    this.defaultHeaders = config.headers || { 'Content-Type': 'application/json' };
    this.retry = config.retry || 0;
    this.retryDelay = config.retryDelay || 1000;
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private async runInterceptors<T>(
    interceptors: Interceptor<T>[],
    value: T
  ): Promise<T> {
    let result: T = value;
    for (const interceptor of interceptors) {
      if (interceptor.onFulfilled) {
        result = await interceptor.onFulfilled(result);
      }
    }
    return result;
  }

  private async runErrorInterceptors<T>(
    interceptors: Interceptor<T>[],
    error: unknown
  ): Promise<never> {
    for (const interceptor of interceptors) {
      if (interceptor.onRejected) {
        error = await interceptor.onRejected(error);
      }
    }
    throw error;
  }

  interceptors = {
    request: {
      use: (onFulfilled?: Interceptor<RequestInit & { url: string }>['onFulfilled'], onRejected?: Interceptor<RequestInit & { url: string }>['onRejected']) => {
        this.requestInterceptors.push({ onFulfilled, onRejected });
      },
    },
    response: {
      use: (onFulfilled?: Interceptor<Response>['onFulfilled'], onRejected?: Interceptor<Response>['onRejected']) => {
        this.responseInterceptors.push({ onFulfilled, onRejected });
      },
    },
  };

  async request<T>(
    method: string,
    url: string,
    data?: Record<string, unknown>,
    config: RequestInit = {}
  ): Promise<Response<T>> {
    const requestId = this.generateRequestId();
    const abortController = new AbortController();
    this.abortControllers.set(requestId, abortController);

    const fullUrl = this.baseURL ? `${this.baseURL}${url}` : url;

    const defaultConfig: RequestInit = {
      method,
      headers: { ...this.defaultHeaders, ...(config.headers as Record<string, string>) },
      signal: abortController.signal,
      ...config,
    };

    if (data && method !== 'GET' && method !== 'HEAD') {
      defaultConfig.body = JSON.stringify(data);
    }

    let requestConfig = { ...defaultConfig, url: fullUrl };

    try {
      requestConfig = await this.runInterceptors(this.requestInterceptors, requestConfig);

      const timeoutId = setTimeout(() => {
        abortController.abort();
      }, this.timeout);

      let retries = 0;
      let response: Response<T>;

      while (retries <= this.retry) {
        try {
          const fetchResponse = await fetch(requestConfig.url, requestConfig);

          clearTimeout(timeoutId);

          const responseData = await fetchResponse.json().catch(() => ({}));

          const headers: Record<string, string> = {};
          fetchResponse.headers.forEach((value, key) => {
            headers[key] = value;
          });

          response = {
            data: responseData as T,
            status: fetchResponse.status,
            statusText: fetchResponse.statusText,
            headers,
            config: requestConfig,
          };

          if (!fetchResponse.ok) {
            throw new Error(`HTTP error! status: ${fetchResponse.status}`);
          }

          break;
        } catch (error) {
          if (retries >= this.retry) {
            throw error;
          }
          retries++;
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay * retries));
        }
      }

      return this.runInterceptors(this.responseInterceptors, response!) as Promise<Response<T>>;
    } catch (error) {
      return this.runErrorInterceptors(this.responseInterceptors, error);
    } finally {
      this.abortControllers.delete(requestId);
    }
  }

  cancelRequest(requestId: string): void {
    const controller = this.abortControllers.get(requestId);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(requestId);
    }
  }

  cancelAllRequests(): void {
    this.abortControllers.forEach((controller) => controller.abort());
    this.abortControllers.clear();
  }

  async get<T>(url: string, config: RequestInit = {}): Promise<Response<T>> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: Record<string, unknown>,
    config: RequestInit = {}
  ): Promise<Response<T>> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(
    url: string,
    data?: Record<string, unknown>,
    config: RequestInit = {}
  ): Promise<Response<T>> {
    return this.request<T>('PUT', url, data, config);
  }

  async delete<T>(
    url: string,
    data?: Record<string, unknown>,
    config: RequestInit = {}
  ): Promise<Response<T>> {
    return this.request<T>('DELETE', url, data, config);
  }

  async patch<T>(
    url: string,
    data?: Record<string, unknown>,
    config: RequestInit = {}
  ): Promise<Response<T>> {
    return this.request<T>('PATCH', url, data, config);
  }
}

const request = new HttpFetch({
  baseURL: '',
  timeout: 10000,
  retry: 0,
});

export { request, HttpFetch };
export type { Response, RequestConfig };