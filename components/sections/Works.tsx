import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { ArrowUpRight } from 'lucide-react';

const Works: React.FC = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <div className="w-full min-h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-32 relative py-10">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mb-8 md:mb-12 text-center md:text-left"
            >
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-cyan-500 font-mono bg-black/70 px-3 py-1 rounded backdrop-blur-sm border border-cyan-500/20">
                    Selected Works 2024-{new Date().getFullYear()}
                </span>
            </motion.div>

            <div className="flex flex-col w-full space-y-4 z-10">
                {PROJECTS.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={`group py-6 md:py-10 flex flex-col lg:flex-row justify-between items-start lg:items-center cursor-pointer transition-all duration-300 px-4 md:px-8 rounded-xl border border-transparent ${
                            hoveredProject === project.id
                                ? 'bg-black/90 border-white/20 translate-x-0 md:translate-x-2 shadow-2xl shadow-cyan-900/20'
                                : 'bg-black/60 border-white/5 hover:bg-black/80'
                        } backdrop-blur-md`}
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                        onClick={() => project.link && window.open(project.link, '_blank')}
                    >
                        <div className="flex-1 w-full">
                            <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                                <span className="text-[10px] md:text-xs font-mono text-cyan-500">0{project.id}</span>
                                <h3 className="text-xl sm:text-3xl md:text-5xl font-bold font-syne text-white group-hover:text-cyan-200 transition-colors drop-shadow-md">
                                    {project.title}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-xs sm:text-sm md:text-base font-light group-hover:text-white transition-colors mb-2 md:mb-0">
                                {project.subtitle}
                            </p>

                            {/* Description for mobile */}
                            <p className="lg:hidden text-xs text-gray-500 line-clamp-2 mt-2 mb-3 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div
                                className={`flex flex-wrap gap-2 mt-2 md:mt-4 overflow-hidden transition-all duration-500 
                   opacity-100 max-h-20 lg:max-h-0 lg:opacity-0 ${hoveredProject === project.id ? 'lg:max-h-20 lg:opacity-100' : ''}`}
                            >
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="text-[9px] md:text-[10px] border border-white/20 px-2 py-1 rounded text-gray-300 bg-white/5"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 lg:mt-0 lg:pl-12 flex items-center gap-6 w-full lg:w-auto justify-end lg:justify-start">
                            <span className="hidden lg:block text-xs text-gray-400 max-w-[200px] text-right leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                                {project.description.substring(0, 80)}...
                            </span>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 group-hover:bg-cyan-400 text-white group-hover:text-black flex items-center justify-center transition-all duration-300 lg:group-hover:scale-110 border border-white/20 group-hover:border-transparent">
                                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Works;
