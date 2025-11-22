import React from 'react';
import { SECTIONS } from '../constants';

interface NavigationProps {
    activeSection: number;
    onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6" role="navigation" aria-label="ページセクション">
            {SECTIONS.map((label, index) => (
                <button
                    key={index}
                    className="group relative flex items-center justify-end cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black rounded-full p-1"
                    onClick={() => onNavigate(index)}
                    aria-label={`${label}セクションへ移動`}
                    aria-current={activeSection === index ? 'true' : 'false'}
                >
                    <span
                        className={`absolute right-8 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                            activeSection === index
                                ? 'opacity-100 translate-x-0 text-white'
                                : 'opacity-0 translate-x-4 text-gray-500'
                        }`}
                    >
                        {label}
                    </span>
                    <div
                        className={`w-3 h-3 rounded-full border transition-all duration-500 ${
                            activeSection === index
                                ? 'bg-white border-white scale-125'
                                : 'bg-transparent border-gray-600 hover:border-gray-400'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default Navigation;
