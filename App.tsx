import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './components/ThreeBackground';
import Navigation from './components/Navigation';
import GeminiChat from './components/GeminiChat';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Works from './components/sections/Works';
import Contact from './components/sections/Contact';
import { SECTIONS } from './constants';

function App() {
    const [activeSection, setActiveSection] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Optimized throttle function using requestAnimationFrame
    const throttle = useCallback((func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout | null = null;
        let lastExecTime = 0;
        let rafId: number | null = null;
        
        return (...args: any[]) => {
            const currentTime = Date.now();
            
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            
            rafId = requestAnimationFrame(() => {
                if (currentTime - lastExecTime > delay) {
                    func.apply(null, args);
                    lastExecTime = currentTime;
                } else {
                    if (timeoutId) clearTimeout(timeoutId);
                    timeoutId = setTimeout(
                        () => {
                            func.apply(null, args);
                            lastExecTime = Date.now();
                        },
                        delay - (currentTime - lastExecTime),
                    );
                }
                rafId = null;
            });
        };
    }, []);

    // Optimized scroll handler with Intersection Observer fallback
    useEffect(() => {
        const handleScroll = throttle(() => {
            if (!containerRef.current) return;

            const scrollPosition = containerRef.current.scrollTop;
            const windowHeight = containerRef.current.clientHeight;
            const totalHeight = containerRef.current.scrollHeight - windowHeight;

            // Calculate scroll progress (0 to 1)
            const progress = totalHeight > 0 ? scrollPosition / totalHeight : 0;
            setScrollProgress(progress);

            // Optimized section detection using cached values
            const containerRect = containerRef.current.getBoundingClientRect();
            let currentSection = 0;
            let maxVisibility = 0;

            for (let i = 0; i < sectionRefs.current.length; i++) {
                const section = sectionRefs.current[i];
                if (section) {
                    const sectionRect = section.getBoundingClientRect();
                    const relativeTop = sectionRect.top - containerRect.top;
                    const relativeBottom = sectionRect.bottom - containerRect.top;
                    
                    // Calculate visibility more efficiently
                    const visibleTop = Math.max(relativeTop, scrollPosition);
                    const visibleBottom = Math.min(relativeBottom, scrollPosition + windowHeight);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                    const visibilityRatio = sectionRect.height > 0 ? visibleHeight / sectionRect.height : 0;

                    if (visibilityRatio > maxVisibility) {
                        maxVisibility = visibilityRatio;
                        currentSection = i;
                    }
                }
            }

            setActiveSection(currentSection);
        }, 16); // ~60fps

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            // Initial check after a short delay to ensure layout is complete
            const initialCheckTimeout = setTimeout(handleScroll, 100);
            
            return () => {
                container.removeEventListener('scroll', handleScroll);
                clearTimeout(initialCheckTimeout);
            };
        }
    }, [throttle]);

    const scrollToSection = useCallback((index: number) => {
        const section = sectionRefs.current[index];
        if (section && containerRef.current) {
            const container = containerRef.current;
            const sectionTop = section.offsetTop;
            const containerHeight = container.clientHeight;
            const sectionHeight = section.clientHeight;

            // Calculate position to center the section
            const scrollToPosition = sectionTop - (containerHeight - sectionHeight) / 2;

            // Use requestAnimationFrame for smoother scroll
            requestAnimationFrame(() => {
                container.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth',
                });
            });
        }
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-cyan-400 selection:text-black font-sans">
            {/* Skip to main content link for accessibility */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-600 text-white px-4 py-2 rounded-md z-50"
            >
                メインコンテンツへスキップ
            </a>
            {/* Persistent 3D Background */}
            <ThreeBackground activeSection={activeSection} scrollProgress={scrollProgress} />

            {/* Fixed UI: Logo */}
            <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 mix-blend-difference pointer-events-none">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                    <span className="font-syne font-bold text-xl md:text-2xl tracking-tighter">YUU</span>
                </motion.div>
            </div>

            {/* Main Scrollable Content Container */}
            <div ref={containerRef} className="w-full h-screen overflow-y-auto custom-scrollbar scroll-smooth" id="main-content" role="main">
                <div className="w-full">
                    {/* Hero Section */}
                    <section
                        ref={(el) => {
                            sectionRefs.current[0] = el;
                        }}
                        className="min-h-screen flex items-center justify-center px-4 md:px-0"
                        aria-labelledby="hero-title"
                        aria-describedby="hero-subtitle"
                    >
                        <Hero />
                    </section>

                    {/* About Section */}
                    <section
                        ref={(el) => {
                            sectionRefs.current[1] = el;
                        }}
                        className="min-h-screen flex items-center justify-center px-4 md:px-0"
                        aria-labelledby="about-title"
                    >
                        <About />
                    </section>

                    {/* Works Section */}
                    <section
                        ref={(el) => {
                            sectionRefs.current[2] = el;
                        }}
                        className="min-h-screen flex items-center justify-center px-4 md:px-0"
                        aria-labelledby="works-title"
                    >
                        <Works />
                    </section>

                    {/* Contact Section */}
                    <section
                        ref={(el) => {
                            sectionRefs.current[3] = el;
                        }}
                        className="min-h-screen flex items-center justify-center px-4 md:px-0"
                        aria-labelledby="contact-title"
                    >
                        <Contact />
                    </section>
                </div>
            </div>

            {/* Navigation Dots */}
            <nav aria-label="セクションナビゲーション">
                <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
            </nav>

            <GeminiChat />
        </div>
    );
}

export default App;
