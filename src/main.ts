import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Aida yoyo")
    .setDescription("The Aida yoyo api description")
    .setVersion("1.0")
    .addBearerAuth()
    .addApiKey(
      {
        name: "apikey",
        type: "apiKey",
        description: "Api Key",
      },
      "APIKEY-auth"
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const serverPort = configService.get<string>("SERVER_PORT");
  await app.listen(serverPort);
}
bootstrap();
