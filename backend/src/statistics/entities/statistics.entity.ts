import {
  Column, CreateDateColumn,
  Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";

@Entity("statistics")
export class StatisticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  number_visits: number; // количество посещений

  @Column({ default: 0 })
  clicks_voice_button: number; // количество нажатий на кнопку озвучить

  @Column({ default: 0 })
  number_voiced_characters: number; // количество озвученных символов

  @Column({ default: 0 })
  number_payments: number; // количество оплат

  @Column({ default: 0 })
  amount_payments: number; // сумма оплат

  @Column({ default: 0 })
  number_repeated_payments: number; // количество повторных оплат

  @CreateDateColumn()
  created_at: Date;
}