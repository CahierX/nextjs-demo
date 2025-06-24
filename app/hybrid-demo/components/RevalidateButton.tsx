'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RevalidateButton() {
  const router = useRouter();
  const [isRevalidating, setIsRevalidating] = useState(false);

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    try {
      // 触发页面重新验证
      router.refresh();
      // 等待一下让用户看到效果
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={handleRevalidate}
        disabled={isRevalidating}
        className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRevalidating ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            重新验证中...
          </span>
        ) : (
          '手动重新验证'
        )}
      </button>
    </div>
  );
}
