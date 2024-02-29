import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  async receive(msg: {}) {
    console.log(`>>> msg`, msg);
  }

  async send(exchange: string, routingKey: string, message: any) {
    return await this.amqpConnection.publish(exchange, routingKey, message);
  }
}
