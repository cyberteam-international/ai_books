import { Injectable } from "@nestjs/common";
import { StatisticsDto } from "./dto/statistics.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindOptionsWhere, Repository } from "typeorm";
import { StatisticsEntity } from "./entities/statistics.entity";
import { StatisticsUpdateDto } from "./dto/statistics-update.dto";
import { DateTime } from "luxon";
import { StatisticsOptionsDto } from "./dto/statistics-options.dto";

@Injectable()
export class StatisticsService {

  constructor(@InjectRepository(StatisticsEntity) private statisticsEntityRepository: Repository<StatisticsEntity>) {
  }

  async updateStats(_stats: StatisticsUpdateDto) {
    const dateStart = DateTime.now().startOf("hour").toJSDate();
    const dateEnd = DateTime.now().endOf("hour").toJSDate();

    const isExist = await this.statisticsEntityRepository.exist({
      where: {
        created_at: Between(dateStart, dateEnd)
      }
    });

    if (!isExist) {
      await this.statisticsEntityRepository.save({});
    }

    const stats = await this.getStats();

    const newStats: StatisticsUpdateDto = {};

    if (stats.number_visits !== undefined && _stats.number_visits !== undefined) {
      newStats.number_visits = stats.number_visits + _stats.number_visits;
    }

    if (stats.clicks_voice_button !== undefined && _stats.clicks_voice_button !== undefined) {
      newStats.clicks_voice_button = stats.clicks_voice_button + _stats.clicks_voice_button;
    }

    if (stats.number_voiced_characters !== undefined && _stats.number_voiced_characters !== undefined) {
      newStats.number_voiced_characters = stats.number_voiced_characters + _stats.number_voiced_characters;
    }

    if (stats.number_payments !== undefined && _stats.number_payments !== undefined) {
      newStats.number_payments = stats.number_payments + _stats.number_payments;
    }

    if (stats.amount_payments !== undefined && _stats.amount_payments !== undefined) {
      newStats.amount_payments = stats.amount_payments + _stats.amount_payments;
    }

    if (stats.number_repeated_payments !== undefined && _stats.number_repeated_payments !== undefined) {
      newStats.number_repeated_payments = stats.number_repeated_payments + _stats.number_repeated_payments;
    }

    await this.statisticsEntityRepository.update({}, newStats);
  }

  addVisit() {
    this.updateStats({
      number_visits: 1
    }).catch(console.error);
  }

  async getStats(query?: StatisticsOptionsDto): Promise<StatisticsDto> {
    const dateStart = DateTime.fromFormat(query.start_date, "yyyy-MM-dd").startOf("hour").toJSDate();
    const dateEnd = DateTime.fromFormat(query.end_date, "yyyy-MM-dd").startOf("hour").toJSDate();

    const where: FindOptionsWhere<StatisticsEntity> = {};

    if (dateStart && dateEnd) {
      where.created_at = Between(dateStart, dateEnd);
    }

    const stats = await this.statisticsEntityRepository.find({
      order: { created_at: "DESC" },
      where: where
    });

    return stats.reduce((previousValue, currentValue) => ({
      number_visits: previousValue?.number_visits + currentValue?.number_visits || 0,
      clicks_voice_button: previousValue?.clicks_voice_button + currentValue?.clicks_voice_button || 0,
      number_voiced_characters: previousValue?.number_voiced_characters + currentValue?.number_voiced_characters || 0,
      number_payments: previousValue?.number_payments + currentValue?.number_payments || 0,
      amount_payments: previousValue?.amount_payments + currentValue?.amount_payments || 0,
      number_repeated_payments: previousValue?.number_repeated_payments + currentValue?.number_repeated_payments || 0
    }), {
      number_visits: 0,
      clicks_voice_button: 0,
      number_voiced_characters: 0,
      number_payments: 0,
      amount_payments: 0,
      number_repeated_payments: 0
    });
  }
}
