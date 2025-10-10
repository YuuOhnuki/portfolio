import React from 'react';

interface SkillTagProps {
    children: React.ReactNode;
}

const SkillTag: React.FC<SkillTagProps> = ({ children }) => (
    <span className="inline-flex items-center rounded-full bg-cyan-900/40 px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-800/50 transition duration-300 hover:bg-cyan-800/60 hover:shadow-lg hover:shadow-cyan-500/10">
        {children}
    </span>
);

export default SkillTag;
