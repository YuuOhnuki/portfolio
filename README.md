<div align="center">
  <h1>🚀 Yuu Ohnuki Portfolio</h1>
  <p>Z世代フルスタックエンジニアの革新的なポートフォリオサイト</p>
  <p>Next.js • React • TypeScript • Three.js • AI Integration</p>
</div>

## 📋 Overview

**「若者の『今』をコード化する」**をコンセプトに、Z世代のトレンドと技術力を融合させた没入型3Dポートフォリオサイト。インタラクティブな背景アニメーションとAIチャットアシスタントを搭載し、現代的なWeb体験を提供します。

### ✨ Features

- 🎨 **没入型3D背景** - Three.jsによるインタラクティブなパーティクルアニメーション
- 🤖 **AIチャットアシスタント** - Gemini API連携のポートフォリオ案内AI「Aura」
- 📱 **完全レスポンシブ** - モバイルファースト設計で全デバイス対応
- ⚡ **最適化済み** - パフォーマンスとSEO対策を実装
- ♿ **アクセシビリティ対応** - WAI-ARIA準拠のアクセシブル設計
- 🎯 **セクションナビゲーション** - スムーズスクロールと動的ナビゲーション

### 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API Key

### Installation

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/YuuOhnuki/portfolio.git
   cd portfolio
   ```

2. **依存関係をインストール**
   ```bash
   npm install
   ```

3. **環境変数を設定**
   
   `.env.local` ファイルを作成し、Gemini APIキーを設定：
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```

5. **ブラウザで開く**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
portfolio/
├── components/
│   ├── sections/          # セクションコンポーネント
│   │   ├── Hero.tsx       # ヒーーローセクション
│   │   ├── About.tsx     # プロフィールセクション
│   │   ├── Works.tsx     # 作品セクション
│   │   └── Contact.tsx    # コンタクトセクション
│   ├── ThreeBackground.tsx # 3D背景コンポーネント
│   ├── Navigation.tsx    # ナビゲーション
│   └── GeminiChat.tsx    # AIチャットコンポーネント
├── services/
│   └── geminiService.ts   # Gemini APIサービス
├── public/               # 静的アセット
├── types.ts              # TypeScript型定義
├── constants.ts          # 定数データ
├── App.tsx               # メインアプリケーション
└── index.html            # HTMLテンプレート
```

## 🎨 Customization

### テーマカラーの変更

`index.html` 内のTailwind設定でカラーをカスタマイズ：

```javascript
colors: {
  cyan: {
    400: '#22d3ee',  // プライマリカラー
    500: '#06b6d4',
  },
  teal: {
    400: '#2dd4bf',
    500: '#14b8a6',
  },
}
```

### 3D背景の調整

`components/ThreeBackground.tsx` でパラメータを調整：

- `count`: パーティクル数（現在1500）
- `SPRING_STRENGTH`: バネ定数
- `DAMPING`: ダンピング係数
- アニメーション速度やインタラクション強度

### AIアシスタントの設定

`constants.ts` 内の `GEMINI_SYSTEM_INSTRUCTION` でAIの人格設定を変更：

```typescript
export const GEMINI_SYSTEM_INSTRUCTION = `
あなたはYuu OhnukiのポートフォリオサイトのAIアシスタントです。
// カスタマイズした指示をここに記述
`;
```

## 📱 Performance & SEO

- ⚡ **最適化済みバンドル** - コード分割とツリーシェーキング
- 🎯 **SEO対策** - 構造化データ、メタタグ、サイトマップ
- 🖼️ **画像最適化** - WebP対応と遅延読み込み
- 🚀 **Core Web Vitals** - LCP、FID、CLSの最適化

## 🌐 Deployment

### Vercelでのデプロイ

1. **Vercelにインポート**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **環境変数を設定**
   - Vercelダッシュボードで `VITE_GEMINI_API_KEY` を追加

3. **自動デプロイ**
   - GitHub連携でプッシュ時に自動デプロイ

### 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `VITE_GEMINI_API_KEY` | Google Gemini APIキー | ✅ |

## 🤝 Contributing

バグ報告や機能リクエストは歓迎します！

1. Issueを作成
2. ブランチを切る (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 License

このプロジェクトはMITライセンスの下で公開されています。

## 🔗 Links

- **Live Demo**: https://yuuohnuki-portfolio.vercel.app/
- **GitHub**: https://github.com/YuuOhnuki/portfolio
- **Author**: [Yuu Ohnuki](https://github.com/YuuOhnuki)

---

<div align="center">
  <p>Made with ❤️ by Yuu Ohnuki</p>
  <p>© 2025 Yuu Ohnuki. All rights reserved.</p>
</div>
