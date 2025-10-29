import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Yuu Ohnuki Portfolio | 若者の「今」をコード化',
        short_name: 'Yuu Ohnuki.dev',
        description:
            'Next.js, Python, AI連携、LINE/Discordボット開発に特化したフルスタックエンジニア。Z世代のトレンドと技術力を融合し、革新的なWebアプリケーションを開発します。',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#020617', // gray-950 ベースカラー
        theme_color: '#06b6d4', // cyan-500
        scope: '/',
        lang: 'ja',
        categories: ['portfolio', 'technology', 'developer', 'ai', 'nextjs'],
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icons/icon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/icons/icon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/icons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        screenshots: [
            {
                src: '/og-image.png',
                sizes: '1200x630',
                type: 'image/png',
                label: 'Yuu Ohnuki Portfolio プレビュー',
            },
        ],
        related_applications: [],
        prefer_related_applications: false,
    };
}
