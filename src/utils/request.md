# request 使用文档

## 概述

基于原生 `fetch` 封装的轻量级 HTTP 客户端，提供类似 Axios 的使用体验。

## 基本用法

### 1. 导入

```ts
import { request } from '@/utils/request';
```

### 2. GET 请求

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

async function getUser(id: number) {
  const response = await request.get<User>(`/api/users/${id}`);
  console.log(response.data);    // { id: 1, name: '张三', email: 'xxx' }
  console.log(response.status);  // 200
}

async function getUsers() {
  const response = await request.get<User[]>('/api/users');
  console.log(response.data);    // [{ id: 1, ... }, { id: 2, ... }]
}
```

### 3. POST 请求

```ts
async function createUser() {
  const response = await request.post<User>('/api/users', {
    name: '李四',
    email: 'lisi@example.com',
    age: 25,
  });
  console.log(response.data);    // 创建后的用户数据
}
```

### 4. PUT 请求

```ts
async function updateUser(id: number) {
  const response = await request.put<User>(`/api/users/${id}`, {
    name: '李四（已修改）',
    age: 26,
  });
}
```

### 5. DELETE 请求

```ts
async function deleteUser(id: number) {
  const response = await request.delete(`/api/users/${id}`);
  console.log(response.status);  // 204
}
```

### 6. PATCH 请求

```ts
async function patchUser(id: number) {
  const response = await request.patch<User>(`/api/users/${id}`, {
    age: 27,
  });
}
```

## 响应结构

```ts
interface Response<T> {
  data: T;                    // 响应数据
  status: number;             // HTTP 状态码
  statusText: string;         // 状态文本
  headers: Record<string, string>; // 响应头
  config: RequestInit & { url: string }; // 请求配置
}

// 示例
const { data, status, headers } = await request.get<User>('/api/users/1');
console.log(data.id);        // 1
console.log(status);         // 200
console.log(headers['content-type']); // 'application/json'
```

## 拦截器

### 1. 请求拦截器

```ts
// 添加 Token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// 添加日志
request.interceptors.request.use((config) => {
  console.log('请求 URL:', config.url);
  return config;
});
```

### 2. 响应拦截器

```ts
// 成功拦截
request.interceptors.response.use((response) => {
  console.log('响应状态:', response.status);
  return response;
});

// 错误拦截
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.message.includes('404')) {
        alert('资源不存在');
      } else if (error.message.includes('500')) {
        alert('服务器错误');
      }
    }
    throw error;
  }
);
```

## 创建自定义实例

```ts
import { HttpFetch } from '@/utils/request';

const customFetch = new HttpFetch({
  baseURL: 'https://api.example.com',
  timeout: 15000,
  retry: 3,
  retryDelay: 1000,
  headers: {
    'X-Custom-Header': 'value',
  },
});

// 使用
const response = await customFetch.get('/users');
```

### 配置项说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| baseURL | string | '' | 基础 URL，拼接在请求路径前 |
| timeout | number | 10000 | 超时时间（毫秒） |
| retry | number | 0 | 请求失败后自动重试次数 |
| retryDelay | number | 1000 | 每次重试间隔（毫秒） |
| headers | Record<string, string> | {'Content-Type': 'application/json'} | 默认请求头 |

## 超时控制

```ts
// 方式1：创建实例时配置
const slowFetch = new HttpFetch({
  timeout: 30000, // 30 秒
});

// 方式2：使用默认实例（默认 10 秒）
const response = await request.get('/api/slow-endpoint');
```

## 自动重试

```ts
const retryFetch = new HttpFetch({
  retry: 3,           // 最多重试 3 次
  retryDelay: 1000,   // 每次间隔 1 秒
});

// 当请求失败时（网络错误、5xx），会自动重试
try {
  const response = await retryFetch.get('/api/unstable-endpoint');
} catch (error) {
  // 3 次重试都失败后到达这里
}
```

## 请求取消

```ts
// 取消所有请求
request.cancelAllRequests();

// 组件卸载时取消请求示例
import { useEffect } from 'react';

function UserList() {
  useEffect(() => {
    return () => {
      request.cancelAllRequests();
    };
  }, []);

  return <div>User List</div>;
}
```

## 请求配置

```ts
const response = await request.get('/api/users', {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  cache: 'no-cache',
});

const response = await request.post('/api/users', { name: 'test' }, {
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## 错误处理

```ts
async function fetchData() {
  try {
    const response = await request.get('/api/data');
    console.log(response.data);
  } catch (error) {
    console.error('请求失败:', error);
    
    if (error instanceof Error) {
      console.error('错误信息:', error.message);
    }
  }
}
```

## 完整实战示例

```ts
// 配置拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof Error && error.message.includes('401')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  }
);

// 获取数据
async function loadUsers() {
  try {
    const { data } = await request.get<User[]>('/api/users');
    return data;
  } catch (error) {
    console.error('加载失败:', error);
    return [];
  }
}

// 创建数据
async function createUser(user: Omit<User, 'id'>) {
  try {
    const { data } = await request.post<User>('/api/users', user);
    return data;
  } catch (error) {
    console.error('创建失败:', error);
    throw error;
  }
}

// 更新数据
async function updateUser(id: number, user: Partial<User>) {
  try {
    const { data } = await request.put<User>(`/api/users/${id}`, user);
    return data;
  } catch (error) {
    console.error('更新失败:', error);
    throw error;
  }
}

// 删除数据
async function deleteUser(id: number) {
  try {
    await request.delete(`/api/users/${id}`);
  } catch (error) {
    console.error('删除失败:', error);
    throw error;
  }
}
```