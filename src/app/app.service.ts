import { RmqService } from '@nestjs-microservice/rmq';
import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/common/utils/utils.service';

@Injectable()
export class AppService {
  constructor(private rmqService: RmqService) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async sendMessage(exchange: string, routingKey: string, message = {}) {
    const isSuccess = await this.rmqService.send(exchange, routingKey, message);

    return { status: isSuccess };
  }
}
