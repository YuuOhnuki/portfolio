import React from 'react';
import {
    Lightbulb,
    Code,
    Zap,
    Globe,
    Cpu,
    Users,
    Layers,
    TrendingUp,
    BookOpen,
    MessageSquare,
    ArrowUpRight,
} from 'lucide-react';
import Header from '../components/orgs/Header';
import Footer from '../components/orgs/Footer';
import ProjectCard from '../components/molcs/ProjectCard';
import SkillTag from '../components/atms/SkillTag';
import Seo from '../components/atms/Seo';
import SectionTitle from '@/components/atms/SectionTitle';
import WorkCard from '@/components/molcs/WorkCard';

const SKILLS = [
    {
        category: 'Frontend',
        icon: Code,
        tags: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'NextUI', 'Shadcn'],
    },
    {
        category: 'Backend',
        icon: Layers,
        tags: ['Node.js', 'Python', 'FastAPI', 'Django', 'Bun'],
    },
    {
        category: 'Database',
        icon: Cpu,
        tags: ['MongoDB', 'PostgreSQL', 'Supabase'],
    },
    { category: 'DevOps/Infra', icon: Globe, tags: ['Vercel', 'Raspberry Pi'] },
    {
        category: 'API/Bot',
        icon: MessageSquare,
        tags: ['LINE Messaging API', 'Discord.js', 'Discord.py'],
    },
    { category: 'AI/Auth', icon: Zap, tags: ['Gemini API', 'NextAuth'] },
];

const PROJECTS = [
    {
        title: 'AI連携型 在庫・売上管理Webアプリ',
        subtitle: '文化祭運営のDXを実現',
        description:
            'Next.jsとMongoDBを使い、模擬店向けに在庫管理とリアルタイム売上記録システムを開発。特に、売上データからGemini等のAIを活用して自動で売上分析・予測を行う斬新な機能を実装し、データドリブンな意思決定を可能にしました。',
        tech: ['Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Gemini API'],
        icon: TrendingUp,
    },
    {
        title: '若者向け情報共有プラットフォーム (LINE LIFF & Bot)',
        subtitle: '学生生活に必要な情報を一元管理',
        description:
            '時間割、課題、プリント配布情報などを共有するためのWebアプリ（LIFF）と、LINEメッセージングチャットボットを開発。日常使いのLINE上でシームレスな情報共有を実現し、若者の情報接触実態に合わせたソリューションを提供しました。',
        tech: ['LINE LIFF', 'LINE Messaging API', 'Node.js', 'PostgreSQL'],
        icon: Users,
    },
    {
        title: '多機能Discordコミュニティボット',
        subtitle: '総導入サーバー数100を突破したコミュニティ管理ツール',
        description:
            'サーバー運営の効率化、VCチャットの文字起こし（Text to Speech）、天気情報やHypixel APIなど多数のWeb API連携機能を開発。コミュニティのリアルなニーズに応え、総導入サーバー数100以上を達成しました。',
        tech: ['Discord.js', 'Discord.py', 'Python', 'FastAPI', 'Web API連携'],
        icon: MessageSquare,
    },
    {
        title: '生成AI英語学習支援Webアプリ',
        subtitle: '最新AI技術を活用した学習支援',
        description:
            '生成AIを用いて英語長文の読解問題生成や、効率的な英単語の暗記学習機能を持つウェブアプリケーションを開発。教育分野におけるAI活用と、モダンなUI/UX設計を両立させました。',
        tech: ['Next.js', 'Python', 'Django', 'AI-Gen', 'NextAuth'],
        icon: BookOpen,
    },
];

const WORKS = [
    {
        title: 'RapidGen',
        subtitle: 'AI画像生成スターターテンプレート',
        description:
            'AIで画像生成を行うWebアプリ。サーバー運用を簡略化し、誰でもAI画像生成アプリを構築できるようにOSS化。AI×Web開発のスターターベースとして公開。',
        tech: ['Next.js', 'TypeScript', 'AI Image API', 'Vercel'],
        links: {
            site: 'https://rapid-gen.vercel.app/',
            github: 'https://github.com/YuuOhnuki/RapidGen',
        },
        icon: Zap,
        image: '/images/rapidgen.png',
    },
    {
        title: '秘密の自習室',
        subtitle: 'インフルエンサー公式サイト',
        description:
            'YouTubeやTikTokで活動する「秘密の自習室」公式サイトを制作・運用。Z世代に親和性の高いUIとミニマルなデザインを意識し、ブランドの世界観をWebで再現。',
        tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
        links: {
            site: 'https://secret-study-room.vercel.app/',
        },
        icon: Users,
        image: '/images/secret-study.png',
    },
];

const CATCHPHRASE = '若者の「今」をコード化し、未来を駆動するフルスタックデベロッパー';

const Home: React.FC = () => {
    return (
        <>
            <Seo />
            <div className="min-h-screen bg-gray-950 text-gray-50 font-sans antialiased">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                    {/* ヒーローセクション */}
                    <section id="hero" className="scroll-mt-24 text-center mb-24 md:mb-36 pt-16">
                        <div className="inline-block bg-cyan-900/30 border border-cyan-700/50 rounded-full px-6 py-2 mb-4 text-xs font-mono text-cyan-400">
                            Next.js / Python / AI Integration
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
                            デジタルの未来を、今、形にする。
                        </h1>
                        <p className="text-xl md:text-3xl font-medium text-gray-200 tracking-wide font-mono mb-10 [text-shadow:0_0_8px_rgba(0,255,255,0.4)]">
                            {CATCHPHRASE}
                        </p>
                        <a
                            href="#連絡先"
                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-gray-900 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 transition duration-300 transform hover:scale-105 hover:bg-cyan-300"
                        >
                            ご相談はこちら
                            <ArrowUpRight className="w-5 h-5 ml-2" />
                        </a>
                    </section>

                    {/* --- 実績セクション --- */}
                    <section id="実績" className="scroll-mt-24 mb-24 md:mb-36">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-cyan-400 tracking-tight relative after:content-[''] after:block after:w-16 after:h-1 after:bg-cyan-500 after:mx-auto after:mt-3 after:rounded-full">
                            プロジェクト実績 (PROJECTS)
                        </h2>
                        <div className="relative">
                            {PROJECTS.map((project, index) => (
                                <ProjectCard key={index} project={project} index={index} />
                            ))}
                        </div>
                    </section>

                    {/* --- 成果物セクション --- */}
                    <section id="成果物" className="scroll-mt-24 mb-24 md:mb-36">
                        <SectionTitle>成果物 (WORKS)</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {WORKS.map((work, index) => (
                                <WorkCard key={index} work={work} index={index} />
                            ))}
                        </div>
                    </section>

                    {/* --- スキルマトリックスセクション --- */}
                    <section id="スキル" className="scroll-mt-24 mb-24 md:mb-36">
                        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-cyan-400 tracking-tight relative after:content-[''] after:block after:w-16 after:h-1 after:bg-cyan-500 after:mx-auto after:mt-3 after:rounded-full">
                            技術スタック (SKILLS)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {SKILLS.map((skill, index) => {
                                const Icon = skill.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-gray-900 p-6 rounded-xl border border-teal-700/30 transition duration-300 hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-900/30"
                                    >
                                        <div className="flex items-center mb-4 border-b border-teal-900/50 pb-3">
                                            <Icon className="w-6 h-6 text-teal-400 mr-3" />
                                            <h3 className="text-xl font-bold text-teal-300">{skill.category}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {skill.tags.map((tag, i) => (
                                                <SkillTag key={i}>{tag}</SkillTag>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* --- 強みセクション --- */}
                    <section id="強み" className="scroll-mt-24 mb-24 md:mb-36">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-cyan-400 tracking-tight relative after:content-[''] after:block after:w-16 after:h-1 after:bg-cyan-500 after:mx-auto after:mt-3 after:rounded-full">
                            なぜ私を選ぶべきか (USP)
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* 強みカード 1 */}
                            <div className="bg-gray-900 p-8 rounded-xl border border-red-700/30 shadow-xl shadow-red-900/30">
                                <Lightbulb className="w-8 h-8 text-red-400 mb-4" />
                                <h3 className="text-2xl font-bold text-red-300 mb-3">若者トレンドの洞察力</h3>
                                <p className="text-gray-300 text-sm">
                                    現役学生として、
                                    <b>Z世代のユーザー行動や最新トレンドを肌で理解</b>
                                    しています。単に技術的に動くアプリではなく、
                                    <b>「今、ウケる」斬新なUI/UX</b>と機能設計を提供します。
                                </p>
                            </div>
                            {/* 強みカード 2 */}
                            <div className="bg-gray-900 p-8 rounded-xl border border-yellow-700/30 shadow-xl shadow-yellow-900/30">
                                <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                                <h3 className="text-2xl font-bold text-yellow-300 mb-3">
                                    AI・コミュニティ連携の即戦力
                                </h3>
                                <p className="text-gray-300 text-sm">
                                    <b>Gemini (AI)</b>、<b>LINE/Discord API</b>
                                    など、最先端の連携実績が豊富です。ただのWebサイトではなく、データを活用し、ユーザーと対話する
                                    <b>高度なアプリケーション</b>を構築します。
                                </p>
                            </div>
                            {/* 強みカード 3 */}
                            <div className="bg-gray-900 p-8 rounded-xl border border-cyan-700/30 shadow-xl shadow-cyan-900/30">
                                <Code className="w-8 h-8 text-cyan-400 mb-4" />
                                <h3 className="text-2xl font-bold text-cyan-300 mb-3">フルスタック一気通貫開発</h3>
                                <p className="text-gray-300 text-sm">
                                    Next.js, Python/FastAPI, TypeScript, PostgreSQL/MongoDBなど、
                                    <b>フロントエンドからバックエンド、デプロイ（Vercel）まで全て完結</b>
                                    。スピード感と品質を両立した開発が可能です。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* --- 連絡先セクション --- */}
                    <section id="連絡先" className="scroll-mt-24 mb-12">
                        <div className="bg-gray-900 p-8 md:p-12 rounded-xl border-4 border-double border-cyan-700/50 text-center shadow-2xl shadow-cyan-900/50">
                            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
                                ご依頼・ご相談 (CONTACT)
                            </h2>
                            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                                お客様のアイデアを「斬新なアプリ」として形にするお手伝いをさせてください。
                                企画段階からでも、まずはお気軽にご連絡ください。
                            </p>
                            <div className="space-y-4">
                                <p className="text-xl font-mono text-cyan-200">
                                    お問い合わせ先: its.yuu.ohnuki@gmail.com
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Home;
