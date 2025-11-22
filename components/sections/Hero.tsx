import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <div className="w-full min-h-full flex flex-col justify-center items-center text-center relative px-4 select-none py-20 md:py-0">
            {/* Text Backdrop for contrast against particles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-[600px] h-[600px] bg-black/50 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-col items-center gap-2 mb-4 md:mb-6 z-10"
            >
                <div className="px-3 py-1 md:px-4 md:py-1 rounded-full border border-cyan-500/30 bg-black/80 backdrop-blur-md shadow-lg shadow-cyan-900/20">
                    <span className="text-[10px] md:text-sm font-mono text-cyan-400 tracking-wider">
                        Next.js / Python / AI Integration
                    </span>
                </div>
            </motion.div>

            <div className="relative z-10">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none font-syne text-white drop-shadow-2xl"
                    style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
                    id="hero-title"
                >
                    YUU
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-white filter drop-shadow-lg">
                        OHNUKI
                    </span>
                </motion.h1>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 md:mt-8 text-sm sm:text-lg md:text-2xl font-light text-gray-200 tracking-widest font-sans max-w-[80%] z-10 drop-shadow-xl bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5"
                id="hero-subtitle"
            >
                若者の「今」をコード化する
            </motion.p>

            <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: 60 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="w-[1px] bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-cyan-500/0 mt-8 md:mt-12 z-10"
                aria-hidden="true"
            />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 flex flex-col items-center gap-2 opacity-50 animate-bounce z-10"
                aria-hidden="true"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] drop-shadow-md">Explore</span>
                <ArrowDown className="w-4 h-4 text-white drop-shadow-md" />
            </motion.div>
        </div>
    );
};

export default Hero;
