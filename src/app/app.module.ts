import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvs, validationSchema } from 'src/confs/env.confs';
import { UtilsModule } from 'src/common/utils/utils.module';
import { RmqModule } from '@nestjs-microservice/rmq';
import { UserModule } from './user/user.module';
import { RmqQueue } from '@src/consts';

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
    RmqModule.register({ queue: RmqQueue.NESTJS_MICROSERVICE_SEND }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
