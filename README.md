# AineNext 商家导航站

一个纯前端 Next.js 项目，数据全部来自 [laravel-aine-thematic](https://aine.lyove.com) 中 **Business Directory（商家目录）** 项目的接口，用于展示商家分类、推荐商家、搜索与商家详情。本项目只负责「调用接口 → 展示」，界面交互（悬停弹层、页签切换、卡片动效、深色模式等）保持原有设计不变。

## 技术栈

- [Next.js 14](https://nextjs.org/)（App Router）+ React 18 + TypeScript
- Tailwind CSS + Less（部分组件样式）
- react-popper / @popperjs/core（侧边栏悬停弹层）
- lucide-react（图标）

## 功能

| 模块 | 说明 |
|---|---|
| 主侧边栏 | 展示 Business Directory 一级分类（餐厅/咖啡馆/酒店/购物/服务/健康美容/汽车），悬停弹出该分类专属标签子菜单，点击标签跳转并筛选对应商家 |
| 推荐区 | 展示接口中 `featured` 为真的精选商家 |
| 分类区块 | 每个分类一个区块，页签 = 「全部 + 该分类专属标签」，按标签筛选商家 |
| 搜索 | 输入关键词 → 新窗口打开 `/search?q=` 结果页，调用接口搜索商家 |
| 商家详情 | 展示 Logo、分类、标签、详细信息（位置/价格区间/营业时间/地址/电话/邮箱）、访问网站、用户评价、同分类相关商家 |
| 快速筛选弹层 | 分类组来自接口的一级分类，锚点跳转对应区块 |

## 数据来源与接口

基址：`https://aine.lyove.com/api/project/directory`（laravel-aine-thematic 部署后的 Business Directory 项目）。

使用的接口：

| 接口 | 用途 |
|---|---|
| `GET /categories` | 一级分类（主侧边栏、分类区块、筛选弹层） |
| `GET /listings?limit=100` | 全部商家（一次拉取后前端按分类/标签分组） |
| `GET /listings/{id}` | 商家详情 |
| `GET /reviews?filters[listing]={id}` | 商家评价 |
| `GET /listings/search?query={keyword}` | 商家搜索 |

> 接口返回结构：`{ success, code, message, data }`；商家对象内联展开分类、地点、标签、Logo 等关联数据。默认取 `locale=zh` 的中文数据。

## 环境变量

| 变量 | 默认值 | 说明 |
|---|---|---|
| `NEXT_PUBLIC_API_BASE` | `https://aine.lyove.com/api/project/directory` | 接口基址，本地联调可改为 `http://127.0.0.1:8000/api/project/directory` |
| `NEXT_PUBLIC_API_LOCALE` | `zh` | 内容语言（Business Directory 内置 `zh` / `en` 双语数据） |

## 本地运行

```bash
# 安装依赖
npm install

# 开发模式（默认 http://localhost:3000）
npm run dev

# 生产构建
npm run build
npm start
```

## 目录结构

```
src/
├── app/
│   ├── (home)/                # 首页：推荐、分类区块、搜索、筛选弹层
│   │   └── components/
│   │       ├── Banner/        # 顶部横幅
│   │       ├── SearchSection/ # 搜索框
│   │       ├── Featured/      # 推荐商家
│   │       ├── CategorySection/ # 分类区块（标签页签筛选）
│   │       └── FilterPopup/   # 快速筛选弹层
│   ├── detail/[id]/           # 商家详情页
│   ├── search/                # 搜索结果页
│   └── about/                 # 关于页
├── components/
│   ├── DirectoryProvider/     # 全局数据层（分类/商家加载、标签分组）
│   ├── layout/                # 侧边栏、页脚
│   └── ui/                    # 通用组件（Popup、DownloadModal 等）
├── lib/
│   ├── api.ts                 # Business Directory 接口客户端
│   └── icons.ts               # 分类图标映射
├── types/                     # 接口数据类型定义
└── data/resources.ts          # 仅页脚静态数据（友情链接等）
```

## 改造说明

本项目由「硬编码资源导航站」改造而来，改造原则：**UI 交互保持不变，仅把数据源替换为 Business Directory 接口**。

- 原硬编码分类 → 接口一级分类（`/categories`）
- 原静态推荐 → `featured` 精选商家
- 原静态子标签 → 各分类商家独有的标签（按出现频次排序）
- 原跳转外部搜索 → 新窗口打开本站 `/search` 结果页
- 静态详情 → 接口详情 + 评价 + 同分类相关商家

## 部署注意事项

前端部署后访问接口域名需在 Business Directory 项目的**域名白名单**中加入前端所在域名（当前白名单已含 `http://localhost:3000`、`http://localhost:5173` 与接口自身域名），否则接口会因白名单拦截报错，首页会显示错误提示并提供「重试」按钮。

## 常用脚本

```bash
npm run dev    # 开发
npm run build  # 构建
npm run start  # 生产启动
npm run lint   # 代码检查
```
