"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = ['実績', 'スキル', '強み', '連絡先'];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-sm border-b border-cyan-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-extrabold text-cyan-400 tracking-wider font-mono">
          Yuu Ohnuki.dev
        </a>
        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-gray-300 hover:text-cyan-400 transition duration-300 relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </nav>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-cyan-400"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden pb-4 border-t border-cyan-900">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="block px-4 py-2 text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
