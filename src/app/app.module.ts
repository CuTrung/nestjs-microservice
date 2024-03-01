import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvs, validationSchema } from 'src/confs/env.confs';
import { UtilsModule } from 'src/common/utils/utils.module';
import { UserModule } from './user/user.module';
import { RmqModule, RmqService } from '@nestjs-microservice/rmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
      load: [getEnvs],
      validationSchema,
    }),
    UtilsModule,
    UserModule,
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
