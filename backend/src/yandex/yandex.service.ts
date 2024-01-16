import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { join } from "path";
import * as fs from "fs";
import * as ffmpeg from "fluent-ffmpeg";

@Injectable()
export class YandexService {
  constructor(private readonly httpService: HttpService) {
  }

  private apiKey = "AQVN2uk2RxC1h_ot5S4znLedym3icbtcB7eUp52I";
  private folder = "b1g6a2vgmv1tbs3ep75c";


  getSeconds(fileKey: string): Promise<number> {
    try {
      const filePath = join(__dirname, "..", "..", "uploads", fileKey);

      return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            const duration = metadata.format.duration;
            resolve(duration);
          }
        });
      });
    } catch (e) {
      console.error(e)
    }
  }

  promiseMergeFiles = (paths): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const _ffmpeg = ffmpeg();
        const outputKey = new Date().getTime().toString() + "-united.mp3";
        const output = join(__dirname, "..", "..", "uploads", outputKey);
        const outputTemp = join(__dirname, "..", "..", "uploads", "temp");

        for (const path of paths) {
          const pathFile = join(__dirname, "..", "..", "uploads", path);
          _ffmpeg.input(pathFile);
        }

        const res = _ffmpeg.mergeToFile(output, outputTemp);

        return res
          .on("error", (err) => {
            console.error("An error occurred: " + err);
            return reject(err);
          })
          .on("end", () => {
            return resolve(outputKey);
          });
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  };

  async synthesize(text: string, lang: string, voice: string, role?: string): Promise<string> {
    try {
      const query = new URLSearchParams();
      query.set("lang", lang);
      query.set("voice", voice);
      query.set("emotion", role);
      query.set("format", "mp3");

      const response = await this.httpService.axiosRef.post("https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize?" + query.toString(), {
        text: text
      }, {
        headers: {
          "Authorization": "Api-Key " + this.apiKey,
          "x-folder-id": this.folder,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: "stream"
      });

      const keyFile = new Date().getTime().toString() + ".mp3";
      const newName = join(__dirname, "..", "..", "uploads", keyFile);
      response.data.pipe(fs.createWriteStream(newName));

      return keyFile;
    } catch (e) {
      console.error(e?.response?.data || e);
      throw e?.response?.data || e;
    }
  }
}
