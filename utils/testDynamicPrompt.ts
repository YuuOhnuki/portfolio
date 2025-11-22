import { getActivityData, formatActivityForPrompt } from '../services/activityService';
import { generateDynamicSystemPrompt } from '../services/promptService';

/**
 * 動的プロンプト生成機能のテストスクリプト
 */
export const testDynamicPrompt = async () => {
    console.log('🧪 Testing dynamic prompt generation...');

    try {
        // 1. アクティビティデータ取得のテスト
        console.log('\n📊 Fetching activity data...');
        const activityData = await getActivityData();
        console.log('Activity data:', JSON.stringify(activityData, null, 2));

        // 2. プロンプトフォーマットのテスト
        console.log('\n📝 Formatting activity for prompt...');
        const formattedActivity = formatActivityForPrompt(activityData);
        console.log('Formatted activity:', formattedActivity);

        // 3. 動的プロンプト生成のテスト
        console.log('\n🤖 Generating dynamic system prompt...');
        const dynamicPrompt = await generateDynamicSystemPrompt();
        console.log('Dynamic prompt length:', dynamicPrompt.length);
        console.log('Dynamic prompt preview:', dynamicPrompt.slice(-500));

        console.log('\n✅ All tests completed successfully!');
        return {
            success: true,
            activityData,
            formattedActivity,
            dynamicPromptLength: dynamicPrompt.length,
        };
    } catch (error) {
        console.error('❌ Test failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

// ブラウザコンソールからテストを実行できるようにグローバルに公開
if (typeof window !== 'undefined') {
    (window as any).testDynamicPrompt = testDynamicPrompt;
}
