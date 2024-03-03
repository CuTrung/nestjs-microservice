import { INestApplication, VersioningType } from '@nestjs/common';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { HttpHeaders, RmqQueue } from './consts';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DefaultParamsMiddleware } from './common/middlewares/default-params.middleware';
import { RmqService } from '@nestjs-microservice/rmq';
import { MicroserviceOptions } from '@nestjs/microservices';

const _initMicroservices = async (app: INestApplication) => {
  const microservices = [
    app.get(RmqService).register({
      queue: RmqQueue.NESTJS_MICROSERVICE_RECEIVE,
      noAck: false,
      persistent: true,
    }),
  ];
  for (const microservice of microservices) {
    app.connectMicroservice<MicroserviceOptions>(microservice);
  }

  await app.startAllMicroservices();
  return app;
};

export const initApp = async (
  app: INestApplication,
  { white_list, server_prefix, version_latest }
) => {
  app.setGlobalPrefix(server_prefix);
  app.use(DefaultParamsMiddleware);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: HttpHeaders.VERSION,
    defaultVersion: version_latest,
  });
  app.use(helmet(), compression(), cookieParser());
  app.enableCors({
    origin: white_list,
  });
  app = await _initMicroservices(app);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  return app;
};
