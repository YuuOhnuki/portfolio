import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '' }) => (
  <h2
    className={`text-4xl md:text-5xl font-bold mb-12 text-center text-cyan-400 tracking-tight relative after:content-[''] after:block after:w-16 after:h-1 after:bg-cyan-500 after:mx-auto after:mt-3 after:rounded-full ${className}`}
  >
    {children}
  </h2>
);

export default SectionTitle;
