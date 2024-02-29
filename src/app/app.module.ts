import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvs, validationSchema } from 'src/confs/env.confs';
import { UtilsModule } from 'src/common/utils/utils.module';
import { UtilsService } from 'src/common/utils/utils.service';
import { UserModule } from './user/user.module';
import { RmqModule } from '@nestjs-microservice/rmq';
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
  providers: [AppService, UtilsService],
  exports: [UtilsModule],
})
export class AppModule {}
