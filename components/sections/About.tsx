import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../constants';
import { Github, BookText, PenTool, ExternalLink } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="w-full min-h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 lg:px-24 relative py-10 lg:py-20">
            {/* Left Side: Text */}
            <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-black/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight font-syne drop-shadow-lg">
                        DIGITAL
                        <br />
                        <span className="text-cyan-400">ARCHITECT.</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light mb-8">
                        Z世代のトレンドと技術力を融合させ、斬新なアプリケーションを開発します。 Next.js, Python,
                        AI連携、LINE/Discordボット開発に特化したフルスタックエンジニアとして、 単に動くものではなく、
                        <span className="text-white font-medium border-b border-cyan-500">「今、ウケる」体験</span>
                        を設計します。
                    </p>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <a href="https://github.com/YuuOhnuki" target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 rounded-full transition-all duration-300 group cursor-pointer">
                                <Github className="w-4 h-4" />
                                <span className="text-xs font-mono font-bold tracking-wider">GITHUB</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                        <a href="https://zenn.dev/ohnukiyuu" target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#3EA8FF]/20 border border-white/10 hover:border-[#3EA8FF] text-gray-300 hover:text-[#3EA8FF] rounded-full transition-all duration-300 group cursor-pointer">
                                <BookText className="w-4 h-4" />
                                <span className="text-xs font-mono font-bold tracking-wider">ZENN</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                        <a href="https://note.com/yuu_0814" target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-[#41C9B4]/20 border border-white/10 hover:border-[#41C9B4] text-gray-300 hover:text-[#41C9B4] rounded-full transition-all duration-300 group cursor-pointer">
                                <PenTool className="w-4 h-4" />
                                <span className="text-xs font-mono font-bold tracking-wider">NOTE</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Skills Matrix */}
            <div className="w-full lg:w-1/2 z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SKILLS.map((skillGroup, idx) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx, duration: 0.5 }}
                            className="bg-black/80 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 group shadow-lg hover:shadow-cyan-900/20"
                        >
                            <h3 className="text-cyan-400 font-bold mb-3 text-xs md:text-sm uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] md:text-xs lg:text-sm text-gray-300 bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
