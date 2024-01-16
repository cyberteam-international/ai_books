import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { json, urlencoded } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationError } from "class-validator";

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 3000;
  const app: any = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle("AiBooks API")
    .setDescription("The AiBooks API")
    .setVersion("1.0.0")
    .addBearerAuth({
      description: "Authorization token",
      type: "http",
      in: "header",
      scheme: "bearer"
    }, "Authorization")
    .setContact("Alexey Snegirev", "https://github.com/viridius-hub", "smiledie-hub@yandex.ru")
    .setExternalDoc("GitHub Readme", "")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/docs", app, document, {
    explorer: true,
    customSiteTitle: "AiBooks API",
    customCss: ".swagger-ui .topbar { display: none }"
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(json({ limit: "5mb" }));
  app.use(urlencoded({ extended: true, limit: "5mb" }));
  app.set("trust proxy", true);

  await app.listen(PORT, () => console.log("Server started on port =", PORT));
}

bootstrap().catch(console.error);
