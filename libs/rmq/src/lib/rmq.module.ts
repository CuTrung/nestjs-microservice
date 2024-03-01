import { Global, Logger, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RmqService } from './rmq.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (config: ConfigService) => {
        return {
          exchanges: [
            {
              name: 'exchange1',
              type: 'topic',
            },
          ],
          uri: String(config.get('RMQ_URL')),
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
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
