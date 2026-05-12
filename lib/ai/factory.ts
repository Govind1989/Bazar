import { GoogleGenerativeAI } from "@google/generative-ai";

export interface LLMProvider {
  name: string;
  generateResponse: (prompt: string, context?: string) => Promise<string>;
  streamResponse: (prompt: string, context?: string) => AsyncGenerator<string>;
}

export abstract class BaseLLMProvider implements LLMProvider {
  abstract name: string;
  protected apiKey: string;
  protected model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  abstract generateResponse(prompt: string, context?: string): Promise<string>;
  abstract streamResponse(prompt: string, context?: string): AsyncGenerator<string>;
}

export class GeminiProvider extends BaseLLMProvider {
  name = "Google Gemini";
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string, model: string = "gemini-1.5-pro") {
    super(apiKey, model);
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async generateResponse(prompt: string, context?: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: this.model });
    const fullPrompt = context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt;
    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  }

  async *streamResponse(prompt: string, context?: string): AsyncGenerator<string> {
    const model = this.genAI.getGenerativeModel({ model: this.model });
    const fullPrompt = context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt;
    const result = await model.generateContentStream(fullPrompt);
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  }
}

export class LLMFactory {
  static createProvider(
    provider: 'google' | 'openai' | 'anthropic', 
    apiKey: string, 
    model: string
  ): LLMProvider {
    switch (provider) {
      case 'google':
        return new GeminiProvider(apiKey, model);
      // case 'openai': return new OpenAIProvider(apiKey, model);
      // case 'anthropic': return new AnthropicProvider(apiKey, model);
      default:
        throw new Error(`Provider ${provider} not supported yet.`);
    }
  }
}
