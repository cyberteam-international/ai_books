import { ConfigService } from "@nestjs/config";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

export const getMailConfig = async (
  configService: ConfigService
): Promise<any> => {
  const MAIL_INCOMING_USER = configService.get<string>("MAIL_INCOMING_USER");
  const MAIL_INCOMING_PASS = configService.get<string>("MAIL_INCOMING_PASS");
  const mailFromName = configService.get<string>("MAIL_FROM_NAME");

  return {
    transport: {
      host: 'smtp.yandex.ru',
      port: 465,
      auth: {
        user: MAIL_INCOMING_USER,
        pass: MAIL_INCOMING_PASS,
      },
    },
    defaults: {
      from: `"${mailFromName}" <${MAIL_INCOMING_USER}>`
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false
      }
    }
  };
};