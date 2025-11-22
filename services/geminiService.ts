import { GoogleGenAI, Chat } from '@google/genai';
import { profileService } from './profileService';
import { getCachedDynamicPrompt } from './promptService';

let chatSession: Chat | null = null;

export const initializeChat = async () => {
    try {
        if (!process.env.API_KEY) {
            console.error('API_KEY is missing');
            return null;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        // 動的システムプロンプトを取得
        const dynamicSystemInstruction = await getCachedDynamicPrompt();

        chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: dynamicSystemInstruction,
            },
        });
        return chatSession;
    } catch (error) {
        console.error('Failed to initialize chat:', error);
        return null;
    }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!chatSession) {
        chatSession = await initializeChat();
    }

    if (!chatSession) {
        return 'エラー: AIサービスが利用できません（APIキーが見つかりません）。';
    }

    try {
        // Check if message asks for profile information
        if (
            message.includes('スキル') ||
            message.includes('経歴') ||
            message.includes('実績') ||
            message.includes('プロフィール')
        ) {
            const profileData = await profileService.getProfileData();
            const enhancedMessage = `${message}\n\n最新のプロフィール情報:\n${JSON.stringify(profileData, null, 2)}`;
            const result = await chatSession.sendMessage({ message: enhancedMessage });
            return result.text || '応答が生成されませんでした。';
        }

        const result = await chatSession.sendMessage({ message });
        return result.text || '応答が生成されませんでした。';
    } catch (error) {
        console.error('Gemini API Error:', error);
        return '申し訳ありません。現在接続に問題が発生しています。しばらく経ってから再度お試しください。';
    }
};
