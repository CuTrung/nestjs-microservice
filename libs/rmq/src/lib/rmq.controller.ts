import { Controller, Get, Headers, Param } from '@nestjs/common';
import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RmqService } from './rmq.service';

@Controller('rmq')
export class RmqController {
  constructor(private rmqService: RmqService) {}
  // @RabbitRPC({
  //   exchange: 'exchange1',
  //   routingKey: 'subscribe-route',
  //   queue: 'subscribe-queue',
  //   // queueOptions: {
  //   //   channel: 'channel-2',
  //   // },
  // })
  // public async rpcHandler(msg: {}) {
  //   return {
  //     // if (someCondition) {
  //     //   return 42;
  //     // } else if (requeueCondition) {
  //     //   return new Nack(true);
  //     // } else {
  //     //   // Will not be requeued
  //     //   return new Nack();
  //     // }
  //   };
  // }

  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'subscribe-route',
    // queue: 'subscribe-queue',
  })
  async receive({ headers = {}, ...msg }) {
    this.rmqService.receive(msg);
  }

  @Get(':id')
  async sendMessage(
    @Param('id') id: number,
    @Headers() headers: Record<string, string>
  ) {
    const isSuccess = await this.rmqService.send(
      'exchange1',
      'subscribe-route',
      { id, headers }
    );

    return { status: isSuccess };
  }
}
