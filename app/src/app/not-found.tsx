import Link from 'next/link';
import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-50 p-6">
            <div className="text-center ">
                {/* ネオンカラーのエラーアイコン */}
                <ShieldAlert className="w-16 h-16 text-red-400 mx-auto mb-6 animate-pulse" />

                {/* エラーコードの表示 */}
                <h1 className="text-6xl font-extrabold text-red-400 mb-4 font-mono [text-shadow:0_0_10px_rgba(255,0,0,0.6)]">
                    404
                </h1>

                <h2 className="text-3xl font-bold text-gray-200 mb-6">ページが見つかりません</h2>

                {/* ホームへのリンクボタン（メインデザインの配色を使用） */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-gray-900 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 transition duration-300 transform hover:scale-105 hover:bg-cyan-300"
                >
                    ホームへ戻る
                </Link>
            </div>
        </div>
    );
}
