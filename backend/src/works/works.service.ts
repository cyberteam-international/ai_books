import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UsersEntity } from "../users/entities/users.entity";
import { CreateWorksDto } from "./dto/create.works.dto";
import { WorksDto } from "./dto/works.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorksEntity } from "./entities/works.entity";
import { UpdateWorksDto } from "./dto/update.works.dto";
import { GptService } from "../gpt/gpt.service";
import { YandexService } from "../yandex/yandex.service";
import { StatisticsService } from "../statistics/statistics.service";

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(WorksEntity) private worksEntityRepository: Repository<WorksEntity>,
    private readonly gptService: GptService,
    private readonly yandexService: YandexService,
    private readonly statisticsService: StatisticsService
  ) {
  }

  private logger = new Logger(WorksService.name);

  protected transformData(entity: WorksEntity): WorksDto {
    return {
      id: entity.id,
      name: entity.name || `Без названия #${entity.id}`,
      lang: entity.lang,
      voice: entity.voice,
      input_text: entity.input_text,
      completed_file: entity.completed_file,
      completed_seconds: entity.completed_seconds,
      created_at: entity.created_at
    };
  }

  public async getById(id: number, user: UsersEntity): Promise<WorksDto> {
    try {
      const entity = await this.worksEntityRepository.findOne({
        where: {
          id: id,
          user: { id: user.id }
        }
      });

      if (!entity) throw new NotFoundException();

      return this.transformData(entity);
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  public async get(user: UsersEntity): Promise<WorksDto[]> {
    try {
      const entities = await this.worksEntityRepository.find({
        where: {
          user: { id: user.id }
        }
      });

      const works: WorksDto[] = [];
      for (let i = 0; i < entities.length; i++) {
        works.push(this.transformData(entities[i]));
      }

      return works;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  public async updateById(id: number, dto: UpdateWorksDto, user: UsersEntity): Promise<WorksDto> {
    try {
      await this.worksEntityRepository.update({
        id: id,
        user: { id: user.id }
      }, {
        name: dto.name
      });

      return await this.getById(id, user);
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  public async deleteById(id: number, user: UsersEntity): Promise<void> {
    try {
      await this.worksEntityRepository.delete({
        id: id,
        user: { id: user.id }
      });
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  public async create(dto: CreateWorksDto, user?: UsersEntity): Promise<WorksDto> {
    try {
      function splitString(str) {
        const pattern = /(.{1,200}(?:\.|$))/g;

        const result = [];
        let match;
        while ((match = pattern.exec(str)) !== null) {
          result.push(match[0]);
        }

        return result;
      }

      const text = dto.input_text.toLowerCase().replace(/\n/g, ".").trim();

      const fragments: string[] = splitString(text);
      const textGpt: string[] = [];
      const audioFiles: any[] = [];
      let completed_file = "";
      let seconds = 0;

      for (let i = 0; i < fragments.length; i++) {
        textGpt.push(await this.gptService.transcribe({
          text: fragments[i]
        }));
      }

      console.log("fragments", fragments);
      console.log("textGpt", textGpt);

      for (let i = 0; i < fragments.length; i++) {
        const audio = await this.yandexService.synthesize(fragments[i], dto.lang, dto.voice, dto.role);
        audioFiles.push(audio);
      }

      if (audioFiles.length > 1) {
        completed_file = await this.yandexService.promiseMergeFiles(audioFiles);
        seconds = await this.yandexService.getSeconds(completed_file);
      } else {
        completed_file = audioFiles[0];
        seconds = await this.yandexService.getSeconds(audioFiles[0]);
      }

      const work = await this.worksEntityRepository.save({
        name: dto.name || null,
        lang: dto.lang,
        voice: dto.voice,
        input_text: dto.input_text,
        user: user ? { id: user.id } : null,
        fragments: fragments,
        fragmentsTranscribe: textGpt,
        output_files: audioFiles,
        completed_file: completed_file,
        completed_seconds: seconds
      });

      this.statisticsService.updateStats({
        clicks_voice_button: 1,
        number_voiced_characters: text.length
      }).catch(console.error);

      return this.transformData(work);
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}