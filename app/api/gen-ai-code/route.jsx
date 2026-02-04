import { createOpenAIClient, OPENAI_MODEL } from '@/configs/AiModel';
import Prompt from "@/data/Prompt";

export async function POST(req) {
    const {prompt} = await req.json();
    try {
        const openai = createOpenAIClient();
        const stream = await openai.chat.completions.create({
            model: OPENAI_MODEL,
            messages: [
                { role: "system", content: Prompt.CODE_GEN_PROMPT },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
            response_format: { type: "json_object" },
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
                    try {
                        const parsedData = JSON.parse(fullText);
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({final: parsedData, done: true})}\n\n`));
                    } catch (e) {
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({error: 'Invalid JSON response', done: true})}\n\n`));
                    }
                    controller.close();
                } catch (e) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({error: e.message || 'Code generation failed'})}\n\n`));
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
    } catch(e) {
        return new Response(JSON.stringify({error: e.message || 'Code generation failed'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
