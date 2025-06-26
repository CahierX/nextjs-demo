"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
    children: ReactNode;
}

export function Modal({ children }: ModalProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        // 延迟关闭以允许动画完成
        setTimeout(() => {
            router.back();
        }, 150);
    }, [router]);

    // 按 Escape 键关闭模态框
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [handleClose]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* 背景遮罩 */}
                    <motion.div
                        className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/80 backdrop-blur-xs"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    />

                    {/* 模态框内容 */}
                    <motion.div 
                        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
                        initial={{ 
                            scale: 0.5, 
                            opacity: 0,
                            y: 50,
                            rotateX: -15
                        }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1,
                            y: 0,
                            rotateX: 0
                        }}
                        exit={{ 
                            scale: 0.8, 
                            opacity: 0,
                            y: -10,
                            rotateX: 15
                        }}
                        transition={{ 
                            type: "spring",
                            damping: 30,
                            stiffness: 500,
                            duration: 0.15
                        }}
                        style={{ perspective: 1000 }}
                    >
                        {/* 装饰性渐变边框 */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl h-full w-full" />
                        </div>

                        {/* 关闭按钮 */}
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                            aria-label="关闭模态框"
                            whileHover={{ 
                                scale: 1.1,
                                rotate: 90
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* 模态框内容 */}
                        <motion.div 
                            className="p-8 overflow-y-auto max-h-[85vh] relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.2 }}
                        >
                            {children}
                        </motion.div>

                        {/* 底部装饰光效 */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
