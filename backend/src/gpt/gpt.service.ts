import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class GptService {
  constructor(private readonly httpService: HttpService) {
  }

  private apiKey = process.env.OPENAI_API_KEY;
  private baseURL = "https://api.openai.com/v1/chat/completions";
  private textTranscribe = "Транскрибируй на русском языке все числительные в том падеже, в котором они приведены в тексте. Замени в тексте все числительные на их транскрипции в правильном падеже. Отдай готовый текст.";

  async transcribe(dto: { text: string }): Promise<string> {
    try {
      const { data } = await this.httpService.axiosRef.post(this.baseURL, {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: this.textTranscribe },
          {
            role: "user",
            content: dto.text
          }]
      }, {
        headers: {
          "Authorization": "Bearer " + this.apiKey,
          "Content-Type": "application/json"
        }
      });

      return data["choices"][0]["message"]["content"];
    } catch (e) {
      console.error(e?.response?.data?.error);
      return dto.text;
    }
  }
}
