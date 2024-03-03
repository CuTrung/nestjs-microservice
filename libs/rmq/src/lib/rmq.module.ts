import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ queue = 'queue' }): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            imports: [RmqModule],
            name: queue,
            useFactory: (rmqService: RmqService) =>
              rmqService.register({ queue }),
            inject: [RmqService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
