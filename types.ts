export interface Project {
    id: number;
    title: string;
    subtitle: string;
    category: string; // e.g., "AI Platform", "Web App"
    year: string;
    image: string;
    description: string;
    tech: string[];
    link?: string;
}

export interface SkillCategory {
    category: string;
    tags: string[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export enum SectionId {
    HERO = 0,
    ABOUT = 1,
    WORKS = 2,
    CONTACT = 3,
}
