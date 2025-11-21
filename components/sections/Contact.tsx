import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, BookText, PenTool, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="w-full min-h-full flex flex-col justify-center items-center px-4 text-center relative py-20">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-8 md:mb-12 relative z-10 p-8 rounded-3xl bg-black/70 backdrop-blur-xl border border-white/5"
            >
                {/* Decorative blur behind text */}
                <div className="absolute inset-0 bg-cyan-500/5 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

                <h2 className="text-4xl sm:text-6xl md:text-9xl font-bold mb-4 md:mb-8 font-syne tracking-tighter relative drop-shadow-2xl">
                    LET'S <span className="text-stroke-white text-transparent">BUILD</span>
                    <br />
                    THE <span className="text-cyan-400">FUTURE</span>
                </h2>

                <p className="text-gray-300 text-sm md:text-xl max-w-xs md:max-w-2xl mx-auto font-light relative px-2 drop-shadow-md">
                    お客様のアイデアを「斬新なアプリ」として形にします。
                    <br className="hidden md:block" />
                    企画段階からでも、まずはお気軽にご連絡ください。
                </p>
            </motion.div>

            <motion.a
                href="mailto:its.yuu.ohnuki@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="z-10 px-6 py-3 md:px-10 md:py-5 bg-white text-black text-sm md:text-lg font-bold rounded-full hover:bg-cyan-400 transition-colors mb-12 md:mb-16 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2 md:gap-3"
            >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">its.yuu.ohnuki@gmail.com</span>
                <span className="sm:hidden">Email Me</span>
            </motion.a>

            <div className="flex gap-4 md:gap-6 z-10 mb-16 md:mb-0">
                <a href="https://github.com/YuuOhnuki" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="p-3 md:p-4 bg-black/60 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300 backdrop-blur-md">
                        <Github className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </a>
                <a href="https://zenn.dev/ohnukiyuu" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="p-3 md:p-4 bg-black/60 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300 backdrop-blur-md">
                        <BookText className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </a>
                <a href="https://note.com/yuu_0814" target="_blank" rel="noopener noreferrer" className="group">
                    <div className="p-3 md:p-4 bg-black/60 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300 backdrop-blur-md">
                        <PenTool className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </a>
            </div>

            <footer className="w-full text-center mt-auto md:absolute md:bottom-8 md:left-0 md:px-16 text-[9px] md:text-xs text-gray-500 uppercase tracking-widest font-mono pointer-events-none">
                <span className="block md:inline mr-0 md:mr-8">© {new Date().getFullYear()} Yuu Ohnuki</span>
                <span className="block md:inline">Tokyo, Japan</span>
            </footer>
        </div>
    );
};

export default Contact;
