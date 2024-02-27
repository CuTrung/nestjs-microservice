import { INestApplication, VersioningType } from '@nestjs/common';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

export const initApp = async (
  app: INestApplication,
  { white_list, server_prefix, version_latest }
) => {
  app.setGlobalPrefix(server_prefix);
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-version',
    defaultVersion: version_latest,
  });
  app.use(helmet(), compression(), cookieParser());
  app.enableCors({
    origin: white_list,
  });

  return app;
};
