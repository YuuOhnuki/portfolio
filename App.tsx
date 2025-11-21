import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeBackground from './components/ThreeBackground';
import Navigation from './components/Navigation';
import GeminiChat from './components/GeminiChat';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Works from './components/sections/Works';
import Contact from './components/sections/Contact';
import { SECTIONS } from './constants';

// Animation Configuration
const TRANSITION_DURATION = 0.8;
const STAGGER_DELAY = 0.05;

// Animation Variants for the Curtain Columns
const curtainVariants = {
    initial: (direction: number) => ({
        scaleY: 1,
        originY: direction > 0 ? 0 : 1,
    }),
    animate: {
        scaleY: 0,
        transition: {
            duration: TRANSITION_DURATION,
            ease: [0.42, 0, 0.58, 1],
        },
    },
    exit: (direction: number) => ({
        scaleY: 1,
        originY: direction > 0 ? 1 : 0,
        transition: {
            duration: TRANSITION_DURATION,
            ease: [0.42, 0, 0.58, 1],
        },
    }),
};

// Variants for the Content
const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.4, duration: 0.6 },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.4 },
    },
};

function App() {
    const [activeSection, setActiveSection] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for down, -1 for up
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Ref for the scrollable container
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartY = useRef(0);

    const totalSections = SECTIONS.length;

    // Reset scroll position when section changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo(0, 0);
        }
        // Lock transition flag briefly to prevent double triggers
        const timer = setTimeout(() => setIsTransitioning(false), 1200);
        return () => clearTimeout(timer);
    }, [activeSection]);

    const changeSection = (newDirection: number) => {
        const nextSection =
            newDirection > 0 ? Math.min(activeSection + 1, totalSections - 1) : Math.max(activeSection - 1, 0);

        if (nextSection !== activeSection) {
            setIsTransitioning(true);
            setDirection(newDirection);
            setActiveSection(nextSection);
        }
    };

    // Handle Scroll/Wheel Events
    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            if (isTransitioning || !containerRef.current) return;

            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const isAtTop = scrollTop <= 0;
            // Allow a small tolerance (e.g., 1px) for math rounding errors
            const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 2;

            if (e.deltaY > 0) {
                // Scrolling Down
                if (isAtBottom) {
                    // Only change section if we are at the bottom
                    changeSection(1);
                }
                // If not at bottom, let native scroll happen
            } else {
                // Scrolling Up
                if (isAtTop) {
                    // Only change section if we are at the top
                    changeSection(-1);
                }
                // If not at top, let native scroll happen
            }
        },
        [activeSection, isTransitioning],
    );

    // Handle Touch Events (Mobile)
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (isTransitioning || !containerRef.current) return;

        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY.current - touchEndY;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const isAtTop = scrollTop <= 0;
        const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 2;

        if (Math.abs(diff) > 50) {
            // Threshold for swipe
            if (diff > 0) {
                // Swipe Up (Scrolling Down)
                if (isAtBottom) changeSection(1);
            } else {
                // Swipe Down (Scrolling Up)
                if (isAtTop) changeSection(-1);
            }
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 0:
                return <Hero />;
            case 1:
                return <About />;
            case 2:
                return <Works />;
            case 3:
                return <Contact />;
            default:
                return <Hero />;
        }
    };

    // Generate 5 columns for the transition effect
    const columns = Array.from({ length: 5 });

    return (
        <div className="relative w-screen h-screen bg-neutral-950 text-white overflow-hidden selection:bg-cyan-400 selection:text-black font-sans">
            {/* Persistent 3D Background */}
            <ThreeBackground activeSection={activeSection} />

            {/* Fixed UI: Logo */}
            <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 mix-blend-difference pointer-events-none">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                    <span className="font-syne font-bold text-xl md:text-2xl tracking-tighter">YU.</span>
                </motion.div>
            </div>

            {/* Fixed UI: Pagination */}
            <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 mix-blend-difference flex items-center gap-2 md:gap-4 font-mono text-xs md:text-sm">
                <span className="hidden md:inline text-gray-400">0{activeSection + 1}</span>
                <div className="w-8 md:w-12 h-[1px] bg-gray-600 hidden md:block" />
                <span className="text-white opacity-50 md:opacity-100">
                    0{activeSection + 1} / 0{totalSections}
                </span>
            </div>

            {/* Main Content Transition Wrapper */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={activeSection}
                    className="w-full h-full relative z-10 flex items-center justify-center"
                >
                    {/* Transition Overlay (The Curtains) */}
                    <div className="absolute inset-0 z-30 flex pointer-events-none">
                        {columns.map((_, i) => (
                            <motion.div
                                key={i}
                                custom={direction}
                                variants={curtainVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="h-full flex-1 bg-neutral-900 border-r border-white/5 last:border-none relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-cyan-900/20" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Section Label */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="absolute z-40 font-syne text-5xl md:text-9xl font-bold text-cyan-900/20 pointer-events-none select-none tracking-tighter top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {SECTIONS[activeSection].toUpperCase()}
                    </motion.div>

                    {/* Scrollable Content Container */}
                    <motion.div
                        ref={containerRef}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full h-full overflow-y-auto custom-scrollbar px-4 md:px-0"
                        onWheel={handleWheel}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="w-full min-h-full max-w-[1600px] mx-auto flex flex-col justify-center py-20 md:py-0">
                            {renderSection()}
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <Navigation
                activeSection={activeSection}
                onNavigate={(idx) => {
                    if (idx === activeSection || isTransitioning) return;
                    setDirection(idx > activeSection ? 1 : -1);
                    setActiveSection(idx);
                }}
            />

            {/* Progress Bar */}
            <motion.div
                className="fixed bottom-0 left-0 h-1 bg-cyan-400 z-50"
                initial={{ width: '0%' }}
                animate={{ width: `${((activeSection + 1) / totalSections) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />

            <GeminiChat />
        </div>
    );
}

export default App;
