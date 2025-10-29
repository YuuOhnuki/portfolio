import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SkillTag from '../atms/SkillTag';
import Image from 'next/image';

interface Work {
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    icon: React.ElementType;
    image?: string;
    links?: {
        site?: string;
        github?: string;
    };
}

interface WorkCardProps {
    work: Work;
    index: number;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
    const Icon = work.icon;

    return (
        <div className="bg-gray-900/80 border border-cyan-800/40 p-6 rounded-xl shadow-lg shadow-cyan-900/30 transition-transform duration-300 hover:scale-[1.02] hover:border-cyan-400/60 flex flex-col justify-between overflow-hidden">
            {/* ロゴ画像 */}
            {work.image && (
                <div className="relative mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={work.image}
                        alt={work.title}
                        width={300}
                        height={300}
                        className="w-full h-40 object-contain bg-gray-950/30 rounded-lg transition-transform duration-500 hover:scale-105"
                        unoptimized={true}
                    />
                </div>
            )}

            {/* タイトル・概要 */}
            <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-cyan-950/50 border border-cyan-800 mr-3">
                    <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-cyan-300">{work.title}</h3>
                    <p className="text-sm font-mono text-gray-400">{work.subtitle}</p>
                </div>
            </div>

            <p className="text-gray-200 text-sm leading-relaxed mb-5">{work.description}</p>

            {/* 使用技術タグ */}
            <div className="flex flex-wrap gap-2 mb-6">
                {work.tech.map((tag, i) => (
                    <SkillTag key={i}>{tag}</SkillTag>
                ))}
            </div>

            {/* 外部リンクボタン */}
            <div className="flex gap-3 mt-auto">
                {work.links?.site && (
                    <a
                        href={work.links.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-bold text-gray-900 bg-cyan-400 rounded-full hover:bg-cyan-300 transition"
                    >
                        サイトを見る
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                )}
                {work.links?.github && (
                    <a
                        href={work.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-bold text-cyan-400 border border-cyan-700 rounded-full hover:bg-cyan-800/50 transition"
                    >
                        GitHub
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default WorkCard;
