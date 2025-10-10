import React from 'react';
import SkillTag from '../atms/SkillTag';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  icon: React.ElementType;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const Icon = project.icon;
  const isOdd = index % 2 === 1;

  return (
    <div className={`relative flex w-full my-8 ${isOdd ? 'justify-end' : 'justify-start'}`}>
      {/* Timeline connector */}
      <div className="absolute top-0 h-full w-0.5 bg-cyan-700/50 left-1/2 -translate-x-1/2 z-0 hidden md:block" />
      <div className="w-full md:w-[48%] relative z-10">
        <div className={`bg-gray-900 border border-cyan-700/70 p-6 md:p-8 rounded-xl shadow-2xl shadow-cyan-900/40 transition duration-500 hover:scale-[1.02] ${isOdd ? 'md:ml-auto' : 'md:mr-auto'}`}>  
          <div className={`absolute -top-4 w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center hidden md:flex ${isOdd ? 'md:right-[-2.25rem]' : 'md:left-[-2.25rem]'}`}>
            <Icon className="w-4 h-4 text-cyan-50" />
          </div>
          <Icon className="w-8 h-8 text-cyan-400 mb-4 block md:hidden" />
          <h3 className="text-2xl font-bold text-cyan-300 mb-2 font-sans tracking-wide">
            {project.title}
          </h3>
          <p className="text-sm font-mono text-gray-400 mb-4 border-b border-cyan-900/50 pb-2">{project.subtitle}</p>
          <p className="text-gray-200 mb-6 leading-relaxed text-sm">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <SkillTag key={i}>{tech}</SkillTag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
