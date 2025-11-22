import { GoogleGenAI, Chat } from '@google/genai';
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';
import { profileService } from './profileService';

let chatSession: Chat | null = null;

export const initializeChat = () => {
    try {
        if (!process.env.API_KEY) {
            console.error('API_KEY is missing');
            return null;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
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
        chatSession = initializeChat();
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
