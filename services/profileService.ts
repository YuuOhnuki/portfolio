/**
 * Service for fetching Yuu Ohnuki's profile information from external platforms
 */

export interface ProfileData {
    platform: string;
    data: any;
    lastUpdated: number;
}

class ProfileService {
    private cache: Map<string, ProfileData> = new Map();
    private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

    /**
     * Fetch profile data from various platforms with caching
     */
    async getProfileData(): Promise<{
        lapras?: any;
        qiita?: any;
        findy?: any;
        zenn?: any;
    }> {
        const results: any = {};

        try {
            results.lapras = await this.fetchWithCache('lapras', 'https://lapras.com/public/OQF4YIV');
            results.qiita = await this.fetchWithCache('qiita', 'https://qiita.com/OhnukiYuu');
            results.findy = await this.fetchWithCache('findy', 'https://findy-code.io/skills-share/LNGFvcIsflYAZ');
            results.zenn = await this.fetchWithCache('zenn', 'https://zenn.dev/ohnukiyuu');
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }

        return results;
    }

    /**
     * Fetch data with caching support
     */
    private async fetchWithCache(platform: string, url: string): Promise<any> {
        const cached = this.cache.get(platform);
        const now = Date.now();

        // Return cached data if still valid
        if (cached && now - cached.lastUpdated < this.CACHE_DURATION) {
            return cached.data;
        }

        try {
            // Note: Due to CORS restrictions, this would need to be implemented
            // with a backend proxy or serverless function
            // For now, return mock data that would be expected from each platform
            const mockData = this.getMockData(platform);

            this.cache.set(platform, {
                platform,
                data: mockData,
                lastUpdated: now,
            });

            return mockData;
        } catch (error) {
            console.error(`Failed to fetch ${platform} data:`, error);
            return null;
        }
    }

    /**
     * Mock data for each platform (would be replaced with actual API calls)
     */
    private getMockData(platform: string): any {
        switch (platform) {
            case 'lapras':
                return {
                    name: 'Yuu Ohnuki',
                    title: 'Full Stack Engineer',
                    skills: ['Next.js', 'TypeScript', 'Python', 'AI'],
                    experience: '2 years',
                    education: 'University Student',
                };

            case 'qiita':
                return {
                    articles: 15,
                    followers: 42,
                    contributions: ['Next.js', 'React', 'TypeScript'],
                    recentArticles: ['Next.js 14の新機能', 'TypeScriptベストプラクティス', 'AI連携アプリ開発'],
                };

            case 'findy':
                return {
                    skills: ['Frontend', 'Backend', 'AI'],
                    level: 'Mid-level',
                    projects: 10,
                    endorsements: 8,
                };

            case 'zenn':
                return {
                    books: 2,
                    articles: 20,
                    followers: 35,
                    topics: ['Next.js', 'AI', 'TypeScript'],
                };

            default:
                return null;
        }
    }

    /**
     * Clear cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}

export const profileService = new ProfileService();
