import Link from 'next/link';
import { friendLinks, couponLinks } from '@/data/resources';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto py-4 px-6 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 mt-8">
      <div className="max-w-[1400px] mx-auto px-6 py-6 rounded-xl bg-white">
        {/* 优惠券区域 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🎁</span>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">省钱助手</h3>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {couponLinks.slice(0, 10).map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600 rounded-xl hover:shadow-sm transition-shadow"
                target="_blank"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{link.name}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">{link.description}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 友情链接 */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🔗</span>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">友情链接</h3>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-3"></div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2">
            {friendLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-center py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                target="_blank"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 底部链接 */}
        <div className="flex justify-center items-center gap-3 py-3 border-t border-gray-100 dark:border-gray-700">
          <Link href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
            更多友链
          </Link>
          <span className="text-gray-200 dark:text-gray-600">|</span>
          <Link href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
            提交收录
          </Link>
          <span className="text-gray-200 dark:text-gray-600">|</span>
          <Link href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
            广告投放
          </Link>
          <span className="text-gray-200 dark:text-gray-600">|</span>
          <Link href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
            关于Next
          </Link>
        </div>

        {/* 版权信息 */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-2 pb-3">
          <p>
            <Link href="/" className="text-blue-500 font-bold hover:underline">
              AineNext
            </Link>
            <span className="mx-2">|</span>
            <Link href="#" className="hover:text-blue-500 transition-colors">
              备案号
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}