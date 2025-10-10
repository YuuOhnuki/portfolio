import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

// vercel
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// google
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    // ポートフォリオのタイトル
    title: '若者の「今」をコード化 | Yuu Ohnuki',

    // ページの説明 (SEO対策)
    description:
        'Next.js, Python, AI連携、LINE/Discordボット開発に特化したフルスタックエンジニアのポートフォリオ。Z世代のトレンドと技術力を融合させ、斬新なアプリケーションを開発します。',

    // 関連キーワード
    keywords: [
        'Next.js',
        'React',
        'TypeScript',
        'Python',
        'AI',
        'Gemini',
        'LINE Bot',
        'Discord Bot',
        'フルスタック',
        'ポートフォリオ',
        'Z世代',
    ],

    // 言語設定
    alternates: {
        canonical: 'https://yuuohnuki-portfolio.vercel.app/', // 実際のドメインに置き換えてください
    },

    // OGP設定 (SNSでのシェア時など)
    openGraph: {
        title: '若者の「今」をコード化 | Yuu Ohnuki',
        description: 'Z世代のトレンドと技術力を融合させた、モダンなWeb開発実績。',
        url: 'https://yuuohnuki-portfolio.vercel.app/',
        siteName: 'Yuu Ohnuki Portfolio',
        locale: 'ja_JP',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <SpeedInsights />
                <Analytics />
                <GoogleAnalytics gaId="G-SKVYXD8J41" />
            </body>
        </html>
    );
}
