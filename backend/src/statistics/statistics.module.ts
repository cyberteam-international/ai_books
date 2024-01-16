import { Global, Module } from "@nestjs/common";
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatisticsEntity } from "./entities/statistics.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([StatisticsEntity]),
  ],
  providers: [StatisticsService],
  controllers: [StatisticsController],
  exports: [StatisticsService]
})
export class StatisticsModule {}
