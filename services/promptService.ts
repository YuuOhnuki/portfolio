import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';
import { getActivityData, formatActivityForPrompt } from './activityService';

/**
 * 動的なシステムプロンプトを生成
 * 基本プロンプトに最新のアクティビティ情報を追加
 */
export const generateDynamicSystemPrompt = async (): Promise<string> => {
    try {
        const activityData = await getActivityData();
        const activityText = formatActivityForPrompt(activityData);

        // 基本プロンプトとアクティビティ情報を結合
        const dynamicPrompt = GEMINI_SYSTEM_INSTRUCTION + activityText;

        return dynamicPrompt;
    } catch (error) {
        console.error('Failed to generate dynamic system prompt:', error);

        // エラー時は基本プロンプトのみを返す
        return GEMINI_SYSTEM_INSTRUCTION;
    }
};

/**
 * キャッシュされた動的プロンプトを取得
 */
let cachedPrompt: string | null = null;
let promptCacheTimestamp: number = 0;
const PROMPT_CACHE_DURATION = 30 * 60 * 1000; // 30分

export const getCachedDynamicPrompt = async (): Promise<string> => {
    const now = Date.now();

    // キャッシュが有効な場合はキャッシュを返す
    if (cachedPrompt && now - promptCacheTimestamp < PROMPT_CACHE_DURATION) {
        return cachedPrompt;
    }

    // 新しいプロンプトを生成してキャッシュ
    const newPrompt = await generateDynamicSystemPrompt();
    cachedPrompt = newPrompt;
    promptCacheTimestamp = now;

    return newPrompt;
};

/**
 * プロンプトキャッシュをクリア
 */
export const clearPromptCache = (): void => {
    cachedPrompt = null;
    promptCacheTimestamp = 0;
};
