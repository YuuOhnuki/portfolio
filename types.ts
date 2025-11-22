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

export interface GitHubActivity {
    type: 'commit' | 'repository';
    title: string;
    url: string;
    timestamp: string;
    repository?: string;
}

export interface QiitaActivity {
    type: 'article';
    title: string;
    url: string;
    timestamp: string;
    tags: string[];
}

export interface ZennActivity {
    type: 'article' | 'scrap';
    title: string;
    url: string;
    timestamp: string;
    contentType: string;
}

export interface ActivityData {
    github: GitHubActivity[];
    qiita: QiitaActivity[];
    zenn: ZennActivity[];
    lastUpdated: string;
}
