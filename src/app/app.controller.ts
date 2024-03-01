import { Controller, Get, Headers, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { RmqService } from 'libs/rmq/src/lib/rmq.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get()
  saveData(@Cookies() cookies: any) {
    return this.appService.getData();
  }

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
    console.log(`>>> msg`, msg);
  }

  @Get(':id')
  async sendMessage(
    @Param('id') id: number,
    @Headers() headers: { string: any }
  ) {
    return await this.appService.sendMessage('exchange1', 'subscribe-route', {
      id,
      headers,
    });
  }
}
