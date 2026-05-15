import { NextRequest } from "next/server";
import { BazarGraph } from "@/lib/agent/graph";
import { AgentContext } from "@/lib/agent/types";

export async function POST(req: NextRequest) {
  const { message, context, apiKey, modelName } = await req.json();

  if (!message || !context) {
    return new Response("Missing message or context", { status: 400 });
  }

  // Inject API Key into environment for the duration of this request
  // This is a prototype approach; in production, use a more secure proxy
  if (apiKey) {
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = apiKey;
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const graph = new BazarGraph(context, (log) => {
        const jsonChunk = `DATA:${JSON.stringify(log)}\n`;
        controller.enqueue(encoder.encode(jsonChunk));
      }, apiKey, modelName);

      await graph.run(message, context);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
