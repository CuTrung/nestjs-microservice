import { RmqContext } from '@nestjs/microservices';
export class RmqParams {
  context?: RmqContext;
  headers?: { [key: string]: any };
}

export class LoggingDto {
  headers: RmqParams['headers'];
}
