import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorksEntity } from "./entities/works.entity";
import { GptModule } from "../gpt/gpt.module";
import { YandexModule } from "../yandex/yandex.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([WorksEntity]),
    GptModule,
    YandexModule
  ],
  providers: [WorksService],
  controllers: [WorksController]
})
export class WorksModule {}
