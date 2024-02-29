import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller('rmq')
export class RmqController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'subscribe-route',
    queue: 'subscribe-queue',
    // queueOptions: {
    //   channel: 'channel-2',
    // },
  })
  public async rpcHandler(msg: {}) {
    return {
      // if (someCondition) {
      //   return 42;
      // } else if (requeueCondition) {
      //   return new Nack(true);
      // } else {
      //   // Will not be requeued
      //   return new Nack();
      // }
    };
  }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route-2',
    queue: 'subscribe-queue-2',
  })
  public async pubSubHandler(msg: {}) {
    console.log(`Received pub/sub message: ${JSON.stringify(msg)}`);
  }

  async sendMessage<T = any>(message: T) {
    return await this.amqpConnection.publish<T>(
      'exchange1',
      'subscribe-route',
      message
    );
  }
}
