import { createOpenAIClient, OPENAI_MODEL } from "@/configs/AiModel";

export async function POST(req) {
    const {prompt} = await req.json();

    try {
        const openai = createOpenAIClient();
        const stream = await openai.chat.completions.create({
            model: OPENAI_MODEL,
            messages: [{ role: "user", content: prompt }],
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
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({result: fullText, done: true})}\n\n`));
                    controller.close();
                } catch (e) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({error: e.message || 'AI chat failed'})}\n\n`));
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
        return new Response(JSON.stringify({error: e.message || 'AI chat failed'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
