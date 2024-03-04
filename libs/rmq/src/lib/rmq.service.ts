import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { HttpHeaders } from '@src/consts';
import { Observable, firstValueFrom, timeout } from 'rxjs';
import { LoggingDto } from './dto';
@Injectable()
export class RmqService {
  constructor(private configService: ConfigService) {}
  register(options: RmqOptions['options']): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [String(this.configService.get('RMQ_URL'))],
        queueOptions: {
          durable: true,
        },
        ...options,
      },
    };
  }

  async getResponse(source: Observable<any>) {
    return await firstValueFrom(source.pipe(timeout(5000)));
  }

  delAck(context: RmqContext) {
    const channel = context.getChannelRef();
    channel.ack(context.getMessage());
  }

  logging({ headers, ...data }: LoggingDto) {
    Logger.log({
      message: `[${headers?.['pattern']}]`,
      payload: JSON.stringify(data),
      requestId: headers?.[HttpHeaders.REQUEST_ID],
    });
  }
}
