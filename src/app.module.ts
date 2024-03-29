import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'development' ? '.env' : '.env.test',
    }),
    //@Throttle({ttl, limit}) Usado para sobrescrever a regra padrão
    //@SkipThrttler() Usado para skipar alguma rota que não se queira ter essa proteção
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
        // Permite que o googlebot acione mais de dez vezes
        ignoreUserAgents: [/googlebot/gi],
      },
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),

    // Configuração do módulo de envio de e-mail
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'marcelle92@ethereal.email',
          pass: 'kx1xTwUdFXEPKRaSkc',
        },
      },
      defaults: {
        from: '"nest-modules" <marcelle92@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          string: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.ENV === 'development',
    }),
  ],
  controllers: [AppController],
  // O ThrottlerGuard está limitando as requisições em massa que podem ser feitas à nossa API
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  exports: [AppService],
})
export class AppModule {}
