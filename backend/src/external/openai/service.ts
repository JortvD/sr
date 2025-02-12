import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: configService.get('OPENAI_API_KEY'),
    });
  }

  async createCompletion(messages: ChatCompletionMessageParam[]): Promise<string|null> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages
    });

    return completion.choices[0].message.content;
  }

  isValidJson(json: string): boolean {
    try {
      JSON.parse(json);
      return true;
    } catch (e) {
      return false;
    }
  }
}