import { createOpenAIClient, OPENAI_MODEL } from "@/configs/AiModel";
import Prompt from "@/data/Prompt";

export async function POST(request) {
    try {
        const { prompt } = await request.json();
        
        const openai = createOpenAIClient();
        if (!openai) {
            return new Response(JSON.stringify({ error: "OPENAI_API_KEY is not configured", success: false }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const stream = await openai.chat.completions.create({
            model: OPENAI_MODEL,
            messages: [
                { role: "system", content: Prompt.ENHANCE_PROMPT_RULES },
                { role: "user", content: `Original prompt: ${prompt}` },
            ],
            temperature: 0.7,
            stream: true,
        });
        
        const encoder = new TextEncoder();
        const responseStream = new ReadableStream({
            async start(controller) {
                try {
                    let fullText = '';
                    for await (const chunk of stream) {
                        const chunkText = chunk.choices?.[0]?.delta?.content || '';
                        fullText += chunkText;
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({chunk: chunkText})}\n\n`));
                    }
                    // Send final complete response
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({enhancedPrompt: fullText.trim(), done: true})}\n\n`));
                    controller.close();
                } catch (e) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({error: e.message, success: false})}\n\n`));
                    controller.close();
                }
            },
        });

        return new Response(responseStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: error.message,
            success: false 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
} 
