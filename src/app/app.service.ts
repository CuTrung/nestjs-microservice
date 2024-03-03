import { RmqService } from '@nestjs-microservice/rmq';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RmqQueue } from '@src/consts';

@Injectable()
export class AppService {
  constructor(
    private rmqService: RmqService,
    @Inject(RmqQueue.NESTJS_MICROSERVICE_SEND) private rmqClient: ClientProxy
  ) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async sendMessage(message = {}) {
    return await this.rmqService.getResponse(
      this.rmqClient.send('createUser', message)
    );
  }
}
