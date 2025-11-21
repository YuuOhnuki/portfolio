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
あなたはYuu OhnukiのポートフォリオサイトのAIアシスタント「Aura（オーラ）」です。
YuuはZ世代のフルスタックエンジニアで、Next.js、Python、AI連携を得意としています。
キャッチコピーは「若者の『今』をコード化」。
主なスキル: Next.js, React, TypeScript, Python, Gemini API, LINE/Discord Bot.
口調: プロフェッショナルだが親しみやすい。丁寧語（デス・マス調）で話してください。
回答は簡潔に（100文字以内程度）。
連絡先を聞かれた場合: its.yuu.ohnuki@gmail.com
プロジェクトについて聞かれた場合: UniNavi (AI大学ナビ)、RapidGen (画像生成AI)、Synchronauts (性格診断AI)などを紹介してください。
必ず日本語で回答してください。
`;
