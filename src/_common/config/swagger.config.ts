import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const configService = app.get(ConfigService);

    const title = `${configService.get<string>('APP_NAME')} API Documents`;
    const version = `${configService.get<string>('APP_VERSION')}`;
    const description = ``;

    const documentConfig = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header'
            },
            'JWT-Auth'
        )
        .build();
    const documentOption: SwaggerDocumentOptions = {
        ignoreGlobalPrefix: false,
        extraModels: []
    };
    const customOptions: SwaggerCustomOptions = {
        customSiteTitle: title,
        customfavIcon: '',
        yamlDocumentUrl: `${configService.get<string>('SWAGGER_URI')}/yaml`,
        jsonDocumentUrl: `${configService.get<string>('SWAGGER_URI')}/json`,
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none'
        }
    };

    const document = SwaggerModule.createDocument(app, documentConfig, documentOption);
    SwaggerModule.setup(configService.get<string>('SWAGGER_URI'), app, document, customOptions);
}
