import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return Response.json({ error: 'No prompt provided' }, { status: 400 });
        }

        // Initialize Gemini (using exact model from AiModel.jsx that works)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-lite-latest' });

        // Create a focused prompt for intent parsing
        const intentPrompt = `You are VANI, a voice-powered AI website builder assistant. A user has requested:

"${prompt}"

Your task: Summarize what you understand the user wants in a single, clear sentence. Start with "I will create" or "I understand you want".

Be specific about what you'll build (e.g., "a landing page with hero section, features grid, and contact form" instead of just "a landing page").

Response (one sentence only):`;

        // Get AI's understanding
        const result = await model.generateContent(intentPrompt);
        const response = await result.response;
        const aiIntent = response.text().trim();

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
