import { Logger, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RmqController } from './rmq.controller';
import { RmqService } from './rmq.service';
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
      // channels: {
      //   'channel-1': {
      //     prefetchCount: 15,
      //     default: true,
      //   },
      //   'channel-2': {
      //     prefetchCount: 2,
      //   },
      // },
    }),
    RmqModule,
  ],
  controllers: [RmqController],
  providers: [RmqService],
  exports: [],
})
export class RmqModule {}
