import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerBehindProxyGuard } from "./guards/throttler-behind-proxy.guard";
import { ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { getMailConfig } from "./configs/mail.config";
import { GptModule } from './gpt/gpt.module';
import { WorksModule } from './works/works.module';
import { YandexModule } from './yandex/yandex.module';
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { VoicesModule } from './voices/voices.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"]
    }),
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        const uploadsPath = join(__dirname, '..', 'uploads');
        return [
          {
            rootPath: uploadsPath,
            serveRoot: '/uploads/',
          },
        ];
      },
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      migrationsRun: true,
      migrations: [],
      subscribers: []
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 60
    }]),
    UsersModule,
    AuthModule,
    GptModule,
    WorksModule,
    YandexModule,
    VoicesModule,
    StatisticsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard
    }
  ]
})
export class AppModule {
}
