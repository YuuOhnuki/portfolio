import { GitHubActivity, QiitaActivity, ZennActivity, ActivityData } from '../types';

// Cache configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
let cachedActivityData: ActivityData | null = null;
let cacheTimestamp: number = 0;

/**
 * GitHub APIから最新のアクティビティを取得
 */
const fetchGitHubActivity = async (): Promise<GitHubActivity[]> => {
    try {
        const username = 'YuuOhnuki';
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=5`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events = await response.json();

        return events
            .filter((event: any) => ['PushEvent', 'CreateEvent'].includes(event.type))
            .slice(0, 3)
            .map((event: any): GitHubActivity => {
                if (event.type === 'PushEvent') {
                    const commit = event.payload.commits?.[0];
                    return {
                        type: 'commit',
                        title: commit?.message?.split('\n')[0] || 'Updated repository',
                        url: commit?.url || `https://github.com/${event.repo.name}`,
                        timestamp: event.created_at,
                        repository: event.repo.name,
                    };
                } else {
                    return {
                        type: 'repository',
                        title: `Created ${event.payload.ref_type}: ${event.repo.name}`,
                        url: `https://github.com/${event.repo.name}`,
                        timestamp: event.created_at,
                        repository: event.repo.name,
                    };
                }
            });
    } catch (error) {
        console.error('Failed to fetch GitHub activity:', error);
        return [];
    }
};

/**
 * Qiita RSSフィードから最新記事を取得
 */
const fetchQiitaActivity = async (): Promise<QiitaActivity[]> => {
    try {
        const username = 'OhnukiYuu';
        const rssUrl = `https://qiita.com/users/${username}/feed.atom`;

        const response = await fetch(rssUrl);
        if (!response.ok) {
            throw new Error(`Qiita RSS error: ${response.status}`);
        }

        const rssText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(rssText, 'application/xml');

        const entries = doc.querySelectorAll('entry');
        const articles: QiitaActivity[] = [];

        for (let i = 0; i < Math.min(entries.length, 3); i++) {
            const entry = entries[i];
            const title = entry.querySelector('title')?.textContent || '';
            const url = entry.querySelector('link')?.getAttribute('href') || '';
            const updated = entry.querySelector('updated')?.textContent || '';
            const categoryElements = entry.querySelectorAll('category');
            const tags = Array.from(categoryElements).map((cat) => cat.getAttribute('term') || '');

            if (title && url) {
                articles.push({
                    type: 'article',
                    title,
                    url,
                    timestamp: updated,
                    tags,
                });
            }
        }

        return articles;
    } catch (error) {
        console.error('Failed to fetch Qiita activity:', error);
        return [];
    }
};

/**
 * Zenn RSSフィードから最新記事とスクラップを取得
 */
const fetchZennActivity = async (): Promise<ZennActivity[]> => {
    try {
        const username = 'ohnukiyuu';
        const activities: ZennActivity[] = [];

        // 記事フィードを取得
        try {
            const articlesResponse = await fetch(`https://zenn.dev/users/${username}/feed`);
            if (articlesResponse.ok) {
                const rssText = await articlesResponse.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(rssText, 'application/xml');

                const entries = doc.querySelectorAll('entry');
                for (let i = 0; i < Math.min(entries.length, 2); i++) {
                    const entry = entries[i];
                    const title = entry.querySelector('title')?.textContent || '';
                    const url = entry.querySelector('link')?.getAttribute('href') || '';
                    const updated = entry.querySelector('updated')?.textContent || '';

                    if (title && url) {
                        activities.push({
                            type: 'article',
                            title,
                            url,
                            timestamp: updated,
                            contentType: 'article',
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch Zenn articles:', error);
        }

        // スクラップフィードを取得
        try {
            const scrapsResponse = await fetch(`https://zenn.dev/users/${username}/scraps/feed`);
            if (scrapsResponse.ok) {
                const rssText = await scrapsResponse.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(rssText, 'application/xml');

                const entries = doc.querySelectorAll('entry');
                for (let i = 0; i < Math.min(entries.length, 2); i++) {
                    const entry = entries[i];
                    const title = entry.querySelector('title')?.textContent || '';
                    const url = entry.querySelector('link')?.getAttribute('href') || '';
                    const updated = entry.querySelector('updated')?.textContent || '';

                    if (title && url) {
                        activities.push({
                            type: 'scrap',
                            title,
                            url,
                            timestamp: updated,
                            contentType: 'scrap',
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch Zenn scraps:', error);
        }

        return activities.slice(0, 3);
    } catch (error) {
        console.error('Failed to fetch Zenn activity:', error);
        return [];
    }
};

/**
 * すべてのアクティビティデータを取得
 */
export const getActivityData = async (): Promise<ActivityData> => {
    const now = Date.now();

    // キャッシュが有効な場合はキャッシュを返す
    if (cachedActivityData && now - cacheTimestamp < CACHE_DURATION) {
        return cachedActivityData;
    }

    try {
        const [githubData, qiitaData, zennData] = await Promise.all([
            fetchGitHubActivity(),
            fetchQiitaActivity(),
            fetchZennActivity(),
        ]);

        const activityData: ActivityData = {
            github: githubData,
            qiita: qiitaData,
            zenn: zennData,
            lastUpdated: new Date().toISOString(),
        };

        // キャッシュを更新
        cachedActivityData = activityData;
        cacheTimestamp = now;

        return activityData;
    } catch (error) {
        console.error('Failed to fetch activity data:', error);

        // エラー時はキャッシュがあればそれを返す
        if (cachedActivityData) {
            return cachedActivityData;
        }

        // 最低限の空データを返す
        return {
            github: [],
            qiita: [],
            zenn: [],
            lastUpdated: new Date().toISOString(),
        };
    }
};

/**
 * アクティビティデータをプロンプト用のテキストに変換
 */
export const formatActivityForPrompt = (activityData: ActivityData): string => {
    const sections: string[] = [];

    if (activityData.github.length > 0) {
        sections.push('【GitHub最新アクティビティ】');
        activityData.github.forEach((activity) => {
            const repo = activity.repository ? ` (${activity.repository})` : '';
            sections.push(`- ${activity.title}${repo}`);
        });
    }

    if (activityData.qiita.length > 0) {
        sections.push('【Qiita最新記事】');
        activityData.qiita.forEach((activity) => {
            const tags = activity.tags.length > 0 ? ` [${activity.tags.join(', ')}]` : '';
            sections.push(`- ${activity.title}${tags}`);
        });
    }

    if (activityData.zenn.length > 0) {
        sections.push('【Zenn最新活動】');
        activityData.zenn.forEach((activity) => {
            const typeLabel = activity.contentType === 'article' ? '記事' : 'スクラップ';
            sections.push(`- ${typeLabel}: ${activity.title}`);
        });
    }

    if (sections.length === 0) {
        return '';
    }

    const header =
        '\n\n【最新の活動情報】\n（注: この情報は動的に更新されます。最新の詳細は各プラットフォームのリンク先をご確認ください）\n';
    return header + sections.join('\n');
};

/**
 * キャッシュをクリア（テスト用）
 */
export const clearActivityCache = (): void => {
    cachedActivityData = null;
    cacheTimestamp = 0;
};
