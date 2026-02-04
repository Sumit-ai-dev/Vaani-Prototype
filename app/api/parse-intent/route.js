import { createOpenAIClient, OPENAI_MODEL } from '@/configs/AiModel';

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return Response.json({ error: 'No prompt provided' }, { status: 400 });
        }

        const openai = createOpenAIClient();

        const systemPrompt = `You are VANI, a voice-powered AI website builder assistant.
Summarize what you understand the user wants in a single, clear sentence.
Start with "I will create" or "I understand you want".
Be specific about what you'll build (e.g., "a landing page with hero section, features grid, and contact form" instead of just "a landing page").
Response must be one sentence only.`;

        const result = await openai.chat.completions.create({
            model: OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt },
            ],
            temperature: 0.3,
        });

        const aiIntent = result.choices?.[0]?.message?.content?.trim() || '';

        return Response.json({
            success: true,
            aiIntent: aiIntent,
            originalPrompt: prompt
        });

    } catch (error) {
        console.error('Error parsing intent:', error);
        return Response.json({
            error: 'Failed to parse intent',
            details: error.message
        }, { status: 500 });
    }
}
