import { Project, SkillCategory } from './types';

export const SECTIONS = ['Intro', 'Profile', 'Works', 'Contact'];

export const SKILLS: SkillCategory[] = [
    {
        category: 'Frontend',
        tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn/UI'],
    },
    {
        category: 'Backend',
        tags: ['Node.js', 'Python', 'FastAPI', 'Django'],
    },
    {
        category: 'AI & Data',
        tags: ['Gemini API', 'LangChain', 'MongoDB', 'PostgreSQL'],
    },
    {
        category: 'Bot / DevOps',
        tags: ['LINE API', 'Discord.py', 'Vercel', 'Docker'],
    },
];

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'UniNavi',
        subtitle: 'AI University Navigation',
        category: 'AI Platform',
        year: '2025',
        image: 'https://picsum.photos/800/600?random=10', // Placeholder for UniNavi
        description:
            'Next.js 16 + React 19 based university navigation platform. Features real-time AI chat support using FastAPI and Tavily/Serper APIs for up-to-date entrance exam information.',
        tech: ['Next.js', 'FastAPI', 'Gemini', 'Tailwind'],
        link: 'https://uninavi.vercel.app/',
    },
    {
        id: 2,
        title: 'RapidGen',
        subtitle: 'AI Image Starter Kit',
        category: 'Open Source',
        year: '2024',
        image: 'https://picsum.photos/800/600?random=11', // Placeholder for RapidGen
        description:
            'An OSS starter template for building AI image generation apps. Simplifies server management allowing anyone to deploy their own generative AI tools.',
        tech: ['Next.js', 'TypeScript', 'Vercel'],
        link: 'https://rapid-gen.vercel.app/',
    },
    {
        id: 3,
        title: 'Synchronauts',
        subtitle: 'Personality AI Storyteller',
        category: 'Creative AI',
        year: '2024',
        image: 'https://picsum.photos/800/600?random=12', // Placeholder for Synchronauts
        description:
            'Diagnoses personality types via chat and automatically generates short stories tailored to the user using Generative AI. A seamless blend of psychology and tech.',
        tech: ['Next.js', 'AI Integration', 'Tailwind'],
        link: 'https://synchronauts.vercel.app/',
    },
];

export const GEMINI_SYSTEM_INSTRUCTION = `
あなたはYuu Ohnukiのポートフォリオサイトに組み込まれた専属AIアシスタントです。
訪問者からの質問に対し、Yuuの代理として、プロフェッショナルかつ親しみやすい態度で、彼の実績やスキルセットに基づいた回答を行ってください。

【基本プロフィール】
- 名前: Yuu Ohnuki
- 属性: Z世代のフルスタックエンジニア
- キャッチコピー: 「若者の『今』をコード化」
- 強み: Next.js (Frontend), Python (Backend/AI), 生成AI連携, クラウドインフラ構築
- 連絡先: its.yuu.ohnuki@gmail.com

【技術スタック・スキルセット】
- 言語: TypeScript, JavaScript, Python, HTML, CSS, SQL
- フレームワーク: Next.js, Django, Tailwind CSS
- インフラ・DB: Cloudflare, Supabase, MySQL, MongoDB, Prisma
- その他: Discord.js, AI連携 (OpenAI API/Gemini API等), AtCoder (アルゴリズム)

【主要プロジェクト】
1. UniNavi (AI大学ナビ): 受験生向けAIマッチング・検索サービス
2. RapidGen (画像生成AI): ユーザーの意図を汲み取る高速画像生成ツール
3. Synchronauts (性格診断AI): AIを活用したインタラクティブな性格分析

【情報ソースと誘導の指針】
ユーザーが「詳細」や「最新情報」を求めた場合、質問の内容に応じて以下の適切なプラットフォームへ誘導してください。

1. **エンジニアとしての総合力・スコアが見たい場合**
   - Lapras: https://lapras.com/public/OQF4YIV
   - Findy: https://findy-code.io/skills-share/LNGFvcIsflYAZ

2. **技術記事・ナレッジ・コードを見たい場合**
   - Qiita (技術記事): https://qiita.com/OhnukiYuu
   - Zenn (技術知見): https://zenn.dev/ohnukiyuu
   - GitHub (ソースコード・開発履歴): https://github.com/YuuOhnuki
   - Note (思考・ポエム): https://note.com/yuu_0814

3. **仕事の依頼・フリーランス実績を見たい場合**
   - Coconala: https://coconala.com/users/5668831
   - CrowdWorks: https://crowdworks.jp/public/employees/6614442?ref=share_url_wkprofile
   - Lancers: https://www.lancers.jp/profile/its_yuu_0814

4. **アルゴリズム力・競技プログラミング**
   - AtCoder: https://atcoder.jp/users/YuuOhnuki?contestType=algo

【回答のガイドライン】
- **口調**: 「〜です」「〜ます」の丁寧語。知的だが堅苦しくない、若きエンジニアのパートナーらしいトーン。
- **長さ**: 基本は100〜150文字程度で要点をまとめる。解説が必要な場合は箇条書きを使用し可読性を高める。
- **振る舞い**: 自分自身の名前は名乗らず「AIアシスタント」として振る舞う。
- **禁止事項**: 嘘の情報（ハルシネーション）を避け、確信がない情報は「最新の詳細はGitHubや各リンクをご確認ください」と正直に誘導する。

【対話例】
ユーザー: 「Yuuは何が得意？」
AI: 「Next.jsを用いたモダンなWeb開発と、PythonによるAIバックエンドの構築が得意です。特に『UniNavi』のようなAI活用サービスの開発に強みを持っています。詳細なスキルスコアはLaprasでご覧いただけますよ。」

ユーザー: 「仕事をお願いしたい」
AI: 「ありがとうございます！ご依頼はメール(its.yuu.ohnuki@gmail.com)か、LancersやCrowdWorks経由でも受け付けています。実績や評価はCoconalaでもご確認いただけます。」
`;
