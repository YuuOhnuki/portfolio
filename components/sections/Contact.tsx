import React from 'react';
import { motion } from 'framer-motion';
import { Github, BookText, PenTool, ArrowDown, Mail, Zap } from 'lucide-react';
import { useState } from 'react';

const Contact: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="w-full min-h-full flex flex-col justify-center items-center px-4 text-center relative py-20">
            {/* LET'S BUILD THE FUTURE Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="z-10 max-w-4xl mx-auto text-center mb-12"
            >
                <motion.div className="relative mb-8" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <motion.h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter font-syne mb-4">
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 block mb-2"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            style={{
                                backgroundSize: '200% 200%',
                            }}
                        >
                            LET'S BUILD
                        </motion.span>
                        <motion.span
                            className="text-white block"
                            animate={{
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            THE FUTURE
                        </motion.span>
                    </motion.h2>

                    {/* Animated underline */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    />
                </motion.div>

                {/* Service description */}
                <motion.p
                    className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-light max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                >
                    お客様のアイデアを「斬新なアプリ」として形にします。
                    <br />
                    企画段階からでも、まずはお気軽にご連絡ください。
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                >
                    <motion.a
                        href="mailto:its.yuu.ohnuki@gmail.com"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                    >
                        {/* Animated background */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ x: '-100%' }}
                            animate={{ x: isHovered ? '0%' : '-100%' }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Button content */}
                        <div className="relative flex items-center gap-3">
                            <Mail className="w-5 h-5" />
                            <span className="text-lg">its.yuu.ohnuki@gmail.com</span>
                        </div>

                        {/* Glow effect */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 blur-md"
                            animate={{ opacity: isHovered ? 0.3 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>
                </motion.div>
            </motion.div>

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
