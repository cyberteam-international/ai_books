import { Module } from '@nestjs/common';
import { YandexService } from './yandex.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  providers: [YandexService],
  exports: [YandexService]
})
export class YandexModule {}
